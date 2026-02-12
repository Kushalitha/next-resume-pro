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

import React from 'react'
import { render } from '@testing-library/react'
import Gallery from '../components/Gallery'
import { checkA11y } from '../test-utils/setupTests'

describe('Gallery accessibility', () => {
  it('has no detectable accessibility violations when rendered', async () => {
    const images = ['/portfolio/studio-portfolio-1.jpg', '/portfolio/studio-portfolio-2.jpg']
    const { container } = render(<Gallery images={images} altPrefix="Test" />)
    await checkA11y(container)
  })
})