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

const fs = require('fs');
const path = require('path');
const LOG_DIR = process.env.DEBUG_LOG_DIR || path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'debug.log');

(async function main(){
  try {
    await fs.promises.unlink(LOG_FILE);
    console.log('Logs cleared');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('No logs to clear');
      process.exit(0);
    }
    console.error(err);
    process.exit(1);
  }
})();
