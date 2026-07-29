"use client";

import { useEffect } from "react";

/**
 * Pointer-tracked refraction on `.tile` cards (sets --mx/--my custom
 * properties consumed by the CSS radial highlight). Purely decorative;
 * cards work identically on touch and keyboard.
 */
export function TilePointerEffect() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    function onMove(e: PointerEvent) {
      const tile = (e.target as HTMLElement).closest<HTMLElement>(".tile");
      if (!tile) return;
      const rect = tile.getBoundingClientRect();
      tile.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      tile.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
