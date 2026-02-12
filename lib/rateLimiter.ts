/**
* Next Resume Pro v2.0.0
* Author: Kushalitha Maduranga
* Year: 2026
*
* License:
* - Code (TypeScript, JavaScript, build scripts): MIT License
* - UI / Design (CSS, layout, visual components): CC BY 4.0
* 	Attribution Required
*
* Repository:
* https://github.com/Kushalitha
*/

import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType | null = null;
let redisReady = false;

async function getRedisClient() {
  if (redisClient) return redisClient;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  redisClient = createClient({ url });
  redisClient.on('error', () => { redisReady = false; });
  try {
    await redisClient.connect();
    redisReady = true;
    return redisClient;
  } catch (_err) {
    redisClient = null;
    redisReady = false;
    return null;
  }
}

// In-memory fallback
type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

/**
 * Check rate limit using Redis if available, otherwise fall back to in-memory
 * Returns { allowed, remaining, reset }
 */
export async function checkRateLimit(key: string, limit = 60, windowMs = 60_000) {
  const client = await getRedisClient();
  const now = Date.now();

  if (client && redisReady) {
    try {
      const redisKey = `rl:${key}`;
      const count = await client.incr(redisKey);
      if (count === 1) {
        // set expiry in seconds
        await client.expire(redisKey, Math.ceil(windowMs / 1000));
      }
      const ttl = await client.ttl(redisKey);
      const reset = ttl > 0 ? now + ttl * 1000 : now + windowMs;
      const allowed = count <= limit;
      const remaining = allowed ? Math.max(0, limit - count) : 0;
      return { allowed, remaining, reset };
    } catch (err) {
      // If Redis fails for any reason, fall back to in-memory implementation
      console.warn('Redis rate limiter failed, falling back to memory limiter', err);
    }
  }

  // In-memory fallback (best-effort)
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true, remaining: limit - 1, reset: now + windowMs };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0, reset: bucket.reset };
  }

  bucket.count += 1;
  buckets.set(key, bucket);
  return { allowed: true, remaining: limit - bucket.count, reset: bucket.reset };
}

// For tests and maintenance
export async function resetAll() {
  buckets.clear();
  if (redisClient && redisReady) {
    try {
      const keys = await redisClient.keys('rl:*');
      if (keys.length) await redisClient.del(keys);
    } catch (err) {
      // ignore
    }
  }
}