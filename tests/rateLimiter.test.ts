import { beforeEach, describe, expect, it } from 'vitest';
import { checkRateLimit, resetAll } from '../lib/rateLimiter';

describe('rateLimiter (in-memory fallback)', () => {
  beforeEach(async () => {
    await resetAll();
    delete process.env.REDIS_URL; // ensure we use in-memory
  });

  it('allows up to limit and then blocks', async () => {
    const key = 'rl-test';
    const limit = 2;
    const windowMs = 1000;

    const r1 = await checkRateLimit(key, limit, windowMs);
    expect(r1.allowed).toBe(true);
    expect(r1.remaining).toBe(limit - 1);

    const r2 = await checkRateLimit(key, limit, windowMs);
    expect(r2.allowed).toBe(true);
    expect(r2.remaining).toBe(0);

    const r3 = await checkRateLimit(key, limit, windowMs);
    expect(r3.allowed).toBe(false);
    expect(r3.remaining).toBe(0);
  });
});