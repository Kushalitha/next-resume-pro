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

'use client';

import React from 'react';

const UIInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function UIInput(props, ref) {
  return <input ref={ref} className="w-full px-3 py-2 border rounded-md bg-transparent focus-visible:ring-2 focus-visible:ring-brand-500" {...props} />;
});

UIInput.displayName = 'UIInput';

export default UIInput;
