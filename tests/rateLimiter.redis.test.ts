import { describe, expect, it } from 'vitest';
import { checkRateLimit, resetAll } from '../lib/rateLimiter';

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  // Skip this test when no REDIS_URL is provided (useful for local dev without Redis)
  it.skip('redis-backed tests skipped (no REDIS_URL)', () => {});
} else {
  describe('rateLimiter (redis integration)', () => {
    beforeEach(async () => {
      await resetAll();
    });

    it('counts via redis and respects limits', async () => {
      const key = 'rl-redis-test';
      const limit = 2;
      const r1 = await checkRateLimit(key, limit, 10_000);
      expect(r1.allowed).toBe(true);

      const r2 = await checkRateLimit(key, limit, 10_000);
      expect(r2.allowed).toBe(true);

      const r3 = await checkRateLimit(key, limit, 10_000);
      expect(r3.allowed).toBe(false);
    });
  });
}
