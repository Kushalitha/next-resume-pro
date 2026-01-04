import { describe, it, expect } from 'vitest';

// These tests ensure we block accidental enabling of debug flags in production
describe('debug env protections', () => {
  const origEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...origEnv };
    // clear module cache to allow re-importing
    try {
      const resolved = require.resolve('../lib/logger');
      if (require.cache[resolved]) delete require.cache[resolved];
    } catch (_e) {
      // module didn't resolve/was not loaded - ignore
    }
  });

  it('throws when DEBUG_ALLOW_READ=true in production', async () => {
    process.env.NODE_ENV = 'production';
    process.env.DEBUG_ALLOW_READ = 'true';
    await expect(import('../lib/logger')).rejects.toThrow(/not allowed in production/);
  });

  it('throws when DEBUG_LOG=true in production', async () => {
    process.env.NODE_ENV = 'production';
    process.env.DEBUG_LOG = 'true';
    await expect(import('../lib/logger')).rejects.toThrow(/not allowed in production/);
  });
});