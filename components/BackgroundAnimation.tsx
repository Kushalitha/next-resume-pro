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

"use client";

import React from "react";

export default function BackgroundAnimation() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />

      <style jsx>{`
        .blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(56px);
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.14;
          transform: translate3d(0,0,0);
          animation: float 18s ease-in-out infinite;
        }

        .b1 {
          width: 420px;
          height: 420px;
          left: -100px;
          top: -100px;
          background: radial-gradient(circle at 30% 30%, rgba(124,58,237,0.12), rgba(124,58,237,0.03));
        }

        .b2 {
          width: 480px;
          height: 480px;
          right: -140px;
          top: 18%;
          background: radial-gradient(circle at 70% 30%, rgba(14,165,233,0.10), rgba(14,165,233,0.02));
          opacity: 0.12;
        }

        .b3 {
          width: 360px;
          height: 360px;
          left: 30%;
          bottom: -100px;
          background: radial-gradient(circle at 40% 60%, rgba(99,102,241,0.08), rgba(99,102,241,0.02));
          opacity: 0.10;
        }

        @keyframes float {
          0% { transform: translate3d(0px, 0px, 0) scale(1); }
          25% { transform: translate3d(10px, -12px, 0) scale(1.02); }
          50% { transform: translate3d(-8px, 10px, 0) scale(0.99); }
          75% { transform: translate3d(6px, -6px, 0) scale(1.01); }
          100% { transform: translate3d(0px, 0px, 0) scale(1); }
        }

        :global(.dark) .blob.b1 {
          background: radial-gradient(circle at 30% 30%, rgba(99,102,241,0.12), rgba(30,41,59,0.02));
          opacity: 0.08;
        }
        :global(.dark) .blob.b2 {
          background: radial-gradient(circle at 70% 30%, rgba(236,72,153,0.08), rgba(30,41,59,0.02));
          opacity: 0.07;
        }
        :global(.dark) .blob.b3 {
          background: radial-gradient(circle at 40% 60%, rgba(34,197,94,0.06), rgba(30,41,59,0.02));
          opacity: 0.06;
        }

        @media (prefers-reduced-motion: reduce) {
          .blob { animation: none; }
        }
      `}</style>
    </div>
  );
}
