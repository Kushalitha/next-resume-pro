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

"use client";

import React, { useEffect, useRef, useState } from "react";

type TypedTextProps = {
  text?: string;
  texts?: string[];
  speed?: number; // ms per char
  backspaceSpeed?: number;
  pause?: number; // pause after typing full string
  className?: string;
};

export default function TypedText({ text, texts, speed = 40, backspaceSpeed = 30, pause = 1200, className = "" }: TypedTextProps) {
  const [displayed, setDisplayed] = useState("");
  const mountedRef = useRef(false);
  const idxRef = useRef(0);
  const iRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const items = texts && texts.length > 0 ? texts : text ? [text] : [];
  const itemsKey = items.join("___");

   
  useEffect(() => {
    mountedRef.current = true;
    const preferReduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const itemsArr = itemsKey ? itemsKey.split("___") : [];
    if (preferReduce || itemsArr.length === 0) {
      // Show first item or text immediately
      const t = setTimeout(() => setDisplayed(itemsArr[0] ?? ""), 0);
      return () => clearTimeout(t);
    }

    function startTypingCycle() {
      const current = itemsArr[idxRef.current % itemsArr.length];
      iRef.current = 0;
      setDisplayed("");

      // start typing
      rafRef.current = requestAnimationFrame(() => {
        timerRef.current = window.setInterval(() => {
          iRef.current += 1;
          setDisplayed(current.slice(0, iRef.current));
          if (iRef.current >= current.length) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            // pause, then backspace
            timerRef.current = window.setTimeout(() => {
              // start backspacing
              timerRef.current = window.setInterval(() => {
                iRef.current -= 1;
                setDisplayed(current.slice(0, iRef.current));
                if (iRef.current <= 0 && timerRef.current) {
                  clearInterval(timerRef.current);
                  timerRef.current = null;
                  idxRef.current = (idxRef.current + 1) % itemsArr.length;
                  // small delay before next word
                  timerRef.current = window.setTimeout(() => startTypingCycle(), 250);
                }
              }, backspaceSpeed);
            }, pause);
          }
        }, speed);
      });
    }

    startTypingCycle();

    return () => {
      mountedRef.current = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [itemsKey, speed, backspaceSpeed, pause]);

  return (
    <div className={`${className} typed-text`} role="status" aria-live="polite">
      <span>{displayed}</span>
      <span className="inline-block w-1 h-4 align-middle bg-[color:var(--accent-2)] ml-1 animate-blink" />
      <style jsx>{`
        .animate-blink {
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-blink { display: none; }
        }
      `}</style>
    </div>
  );
}
