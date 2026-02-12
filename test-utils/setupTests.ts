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

import axe from 'axe-core'

export async function checkA11y(container: HTMLElement) {
  const results = await axe.run(container)
  if (results.violations && results.violations.length > 0) {
    const msgs = results.violations.map((v) => `${v.id}: ${v.help} — ${v.nodes.length} nodes`).join('\n')
    throw new Error('Accessibility violations:\n' + msgs)
  }
}
