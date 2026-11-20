import { beforeEach, expect, test, vi } from 'vitest';
import { collection, getDocs } from 'firebase/firestore';
import { getPositions, getProjects, getSkills } from './firestoreService';
vi.mock('./firebase', () => ({ db: 'test-db' }));
vi.mock('firebase/firestore', () => ({ collection: vi.fn((db, name) => name), getDocs: vi.fn() }));
beforeEach(() => vi.clearAllMocks());
test('position data preserves dates and normalizes descriptions', async () => {
  getDocs.mockResolvedValue({ docs: [{ id: 'position-1', data: () => ({ start: { toDate: () => new Date(2024, 0, 1) }, description: 'Built software' }) }] });
  expect(await getPositions()).toEqual([{ id: 'position-1', start: 'January 2024', end: 'Present', description: ['Built software'] }]);
  expect(collection).toHaveBeenCalledWith('test-db', 'positions');
});
test.each([['projects', getProjects], ['skills', getSkills]])('%s preserves document data and IDs', async (name, read) => {
  getDocs.mockResolvedValue({ docs: [{ id: 'doc-1', data: () => ({ title: 'Example' }) }] });
  expect(await read()).toEqual([{ id: 'doc-1', title: 'Example' }]);
  expect(collection).toHaveBeenCalledWith('test-db', name);
});
test('read failures propagate to callers', async () => {
  getDocs.mockRejectedValue(new Error('permission-denied'));
  await expect(getProjects()).rejects.toThrow('permission-denied');
});
