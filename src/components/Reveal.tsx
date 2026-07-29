"use client";

import { useEffect } from "react";

/**
 * Progressive scroll-reveal. Content is visible by default; this
 * observer arms the hidden state (html.rv-on) only once mounted, then
 * reveals elements as they intersect. Elements already in view are
 * revealed in the observer's first callback, so nothing flashes.
 * Under reduced motion (or without JS) the effect never arms.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    if (els.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 8, 5) * 55}ms`;
      io.observe(el);
    });
    document.documentElement.classList.add("rv-on");

    return () => {
      io.disconnect();
      document.documentElement.classList.remove("rv-on");
    };
  }, []);

  return null;
}
