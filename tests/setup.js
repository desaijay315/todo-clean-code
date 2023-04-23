import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Use Jest's `expect` method directly to write your assertions
expect(true).toBe(true);


// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});