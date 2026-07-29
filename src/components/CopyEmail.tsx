"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";

/**
 * Copy-to-clipboard with an accessible status announcement and a
 * mailto fallback when the Clipboard API is unavailable.
 */
export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  }, []);

  return (
    <span className="relative inline-flex">
      <button type="button" onClick={copy} className={className}>
        {copied ? "Copied ✓" : `Copy email`}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </span>
  );
}
