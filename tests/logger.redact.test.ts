import { describe, expect, it } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

describe('logger redaction and safe logging', () => {
  it('redacts common secrets and long bodies when writing logs', async () => {
    const tmp = path.join(os.tmpdir(), `nrp-logs-test-${Date.now()}`);
    process.env.DEBUG_LOG = 'true';
    process.env.DEBUG_LOG_DIR = tmp;

    // import after env set so module picks up LOG_DIR
    const { log, readLastLines, clearLogs } = await import('../lib/logger');

    // ensure clean
    try { await clearLogs(); } catch (_) {}

    const payload = {
      api_key: 'SECRET_KEY_12345',
      card_number: '4111111111111111',
      password: 'hunter2',
      message: 'x'.repeat(5001),
      nested: { secret: 'topsecret', email: 'user@example.com' }
    };

    await log('info', 'redaction-test', payload);

    // read written log
    const tail = await readLastLines(10_000);

    expect(tail).toBeTruthy();
    // secrets should not appear raw
    expect(tail).not.toContain('SECRET_KEY_12345');
    expect(tail).not.toContain('4111111111111111');
    expect(tail).not.toContain('hunter2');
    expect(tail).not.toContain('topsecret');
    expect(tail).not.toContain('user@example.com');

    // should contain redaction marker or long redaction marker
    expect(tail).toMatch(/REDACTED|\[REDACTED_LONG\]/);

    // cleanup
    try { await fs.rm(tmp, { recursive: true, force: true }); } catch (_) {}
  });
});