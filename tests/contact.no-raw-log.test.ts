import { describe, it, expect } from 'vitest';
import fs from 'fs/promises';
import path from 'path';

describe('no raw contact logs', () => {
  it('does not contain raw console.log of message bodies', async () => {
    const file = path.join(process.cwd(), 'app', 'api', 'contact', 'route.ts');
    const content = await fs.readFile(file, 'utf8');
    expect(content).not.toMatch(/Contact form submission \(email disabled\):/);
    expect(content).not.toMatch(/console\.log\(.*message:/);
  });
});