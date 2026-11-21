import React from 'react';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { signOut } from 'firebase/auth';
import App from './App';

const { dashboardMount, observeAuth } = vi.hoisted(() => ({
  dashboardMount: vi.fn(),
  observeAuth: vi.fn(),
}));
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: observeAuth,
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
}));
vi.mock('./firebase/firebase', () => ({ auth: {}, googleProvider: {} }));
vi.mock('./features/home/Home.jsx', () => ({
  default: ({ mode, section }) => <h1>Portfolio {mode} {section}</h1>,
}));
vi.mock('./features/dashboard/Dashboard.jsx', () => ({
  default: () => {
    dashboardMount();
    return <h1>Dashboard</h1>;
  },
}));

let authChanged;
beforeEach(() => {
  window.history.replaceState(null, '', window.location.pathname);
  dashboardMount.mockClear();
  signOut.mockReset().mockResolvedValue();
  observeAuth.mockImplementation((_auth, callback) => {
    authChanged = callback;
    return vi.fn();
  });
});
afterEach(cleanup);

function open(hash) {
  window.history.replaceState(null, '', hash || window.location.pathname);
  render(<App mode="dark" />);
}

function account(admin) {
  return { getIdTokenResult: vi.fn().mockResolvedValue({ claims: { admin } }) };
}

test.each(['overview', 'experience', 'projects', 'about', 'technologies', 'contact'])(
  'opens the canonical section %s',
  async (section) => {
    open(`#/${section}`);
    expect(await screen.findByRole('heading', { name: `Portfolio dark ${section}` })).toBeInTheDocument();
  },
);

test.each([
  ['', 'overview'],
  ['#/missing/deeper', 'overview'],
  ['#/home', 'overview'],
  ['#/home#home', 'overview'],
  ['#/home#projects', 'projects'],
  ['#/home#about', 'about'],
  ['#/home#skills', 'technologies'],
  ['#/skills', 'technologies'],
])('replaces %s with the canonical section %s', async (hash, section) => {
  const historyLength = window.history.length;
  open(hash);
  expect(await screen.findByRole('heading', { name: `Portfolio dark ${section}` })).toBeInTheDocument();
  expect(window.location.hash).toBe(`#/${section}`);
  expect(window.history.length).toBe(historyLength);
});

test('allows public access to login', async () => {
  open('#/login');
  await act(() => authChanged(null));
  expect(screen.getByRole('heading', { name: 'Admin Login' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Continue with Google' })).toBeEnabled();
});

test('waits for auth, directs a signed-out visitor to login, and resumes the dashboard after admin sign-in', async () => {
  open('#/dashboard');
  expect(screen.getByRole('status')).toHaveTextContent(/authorization/i);
  expect(dashboardMount).not.toHaveBeenCalled();

  await act(() => authChanged(null));
  expect(await screen.findByRole('heading', { name: 'Admin Login' })).toBeInTheDocument();
  expect(window.history.state.usr.from).toBe('/dashboard');
  expect(dashboardMount).not.toHaveBeenCalled();

  const admin = account(true);
  await act(() => authChanged(admin));
  expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
  expect(window.location.hash).toBe('#/dashboard');
  expect(admin.getIdTokenResult).toHaveBeenCalledWith(true);
});

test.each([false, 'true', undefined])('blocks dashboard mounting when the admin claim is %s', async (claim) => {
  open('#/dashboard');
  await act(() => authChanged(account(claim)));
  expect(await screen.findByRole('heading', { name: 'Portfolio dark overview' })).toBeInTheDocument();
  expect(dashboardMount).not.toHaveBeenCalled();
});

test('reports the access denial and signs out a non-admin on the login page', async () => {
  open('#/login');
  await act(() => authChanged(account(false)));
  expect(screen.getByRole('alert')).toHaveTextContent('This account does not have dashboard access.');
  expect(signOut).toHaveBeenCalledTimes(1);
  expect(window.location.hash).toBe('#/login');
  expect(dashboardMount).not.toHaveBeenCalled();
});

test('denies dashboard access if the current claim lookup fails', async () => {
  const loggedError = vi.spyOn(console, 'error').mockImplementation(() => {});
  try {
    open('#/dashboard');
    const error = new Error('Token unavailable');
    await act(() => authChanged({ getIdTokenResult: vi.fn().mockRejectedValue(error) }));
    expect(await screen.findByRole('heading', { name: 'Portfolio dark overview' })).toBeInTheDocument();
    expect(dashboardMount).not.toHaveBeenCalled();
    expect(loggedError).toHaveBeenCalledWith('Error reading admin claim:', error);
  } finally {
    loggedError.mockRestore();
  }
});

test('ignores a pending admin claim after sign-out', async () => {
  open('#/dashboard');
  let resolveToken;
  act(() => {
    authChanged({ getIdTokenResult: () => new Promise((resolve) => { resolveToken = resolve; }) });
  });
  await act(() => authChanged(null));
  expect(await screen.findByRole('heading', { name: 'Admin Login' })).toBeInTheDocument();

  await act(async () => resolveToken({ claims: { admin: true } }));
  expect(window.location.hash).toBe('#/login');
  expect(dashboardMount).not.toHaveBeenCalled();
});

test('ignores an old account claim while the current account is being verified', async () => {
  open('#/dashboard');
  let resolveOldToken;
  let resolveCurrentToken;
  act(() => {
    authChanged({ getIdTokenResult: () => new Promise((resolve) => { resolveOldToken = resolve; }) });
    authChanged({ getIdTokenResult: () => new Promise((resolve) => { resolveCurrentToken = resolve; }) });
  });

  await act(async () => resolveOldToken({ claims: { admin: true } }));
  expect(screen.getByRole('status')).toHaveTextContent(/authorization/i);
  expect(dashboardMount).not.toHaveBeenCalled();
  await act(async () => resolveCurrentToken({ claims: { admin: false } }));
  expect(await screen.findByRole('heading', { name: 'Portfolio dark overview' })).toBeInTheDocument();
  expect(dashboardMount).not.toHaveBeenCalled();
});

test('unmounts an open dashboard immediately on account change', async () => {
  open('#/dashboard');
  await act(() => authChanged(account(true)));
  expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();

  let resolveToken;
  act(() => {
    authChanged({ getIdTokenResult: () => new Promise((resolve) => { resolveToken = resolve; }) });
  });
  expect(screen.queryByRole('heading', { name: 'Dashboard' })).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent(/authorization/i);
  await act(async () => resolveToken({ claims: { admin: false } }));
  await waitFor(() => expect(window.location.hash).toBe('#/overview'));
});
