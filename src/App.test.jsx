import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import App from './App';

vi.mock('./context/AuthContext', () => ({ AuthProvider: ({ children }) => children }));
vi.mock('./features/home/Home.jsx', () => ({ default: ({ mode }) => <h1>Portfolio {mode}</h1> }));
vi.mock('./features/login/Login.jsx', () => ({ default: () => <h1>Sign in</h1> }));
vi.mock('./features/dashboard/Dashboard.jsx', () => ({ default: () => <h1>Dashboard</h1> }));

beforeEach(() => { window.location.hash = ''; });
afterEach(cleanup);

test.each(['', '#/home'])('public route %s preserves theme props', async (hash) => {
  window.location.hash = hash;
  render(<App mode="dark" toggleTheme={() => {}} />);
  expect(await screen.findByRole('heading', { name: 'Portfolio dark' })).toBeInTheDocument();
});
test.each([['#/login', 'Sign in'], ['#/dashboard', 'Dashboard']])('route %s loads', async (hash, heading) => {
  window.location.hash = hash;
  render(<App />);
  expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument();
});
test('unknown routes redirect to home', async () => {
  window.location.hash = '#/missing';
  render(<App mode="light" />);
  expect(await screen.findByRole('heading', { name: 'Portfolio light' })).toBeInTheDocument();
  expect(window.location.hash).toBe('#/home');
});
