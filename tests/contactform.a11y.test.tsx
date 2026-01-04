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

import React from 'react'
import { render } from '@testing-library/react'
import ContactForm from '../components/ContactForm'
import { checkA11y } from '../test-utils/setupTests'

describe('ContactForm accessibility', () => {
  it('has no detectable accessibility violations', async () => {
    const { container } = render(<ContactForm />)
    await checkA11y(container)
  })
})
