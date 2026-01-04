/**
* Next Resume Pro v1.0.0
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

const fs = require('fs');
const path = require('path');

function removeIfExists(p) {
  try {
    if (fs.existsSync(p)) {
      fs.rmSync(p, { recursive: true, force: true });
      console.log('Removed:', p);
    }
  } catch (err) {
    console.error('Failed to remove', p, err);
  }
}

function main() {
  const root = process.cwd();
  const nextDir = path.join(root, '.next');
  const cacheDir = path.join(root, 'node_modules', '.cache');

  removeIfExists(nextDir);
  removeIfExists(cacheDir);

  console.log('Clean complete');
}

if (require.main === module) main();

module.exports = { main };
