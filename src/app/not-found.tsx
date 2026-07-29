import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-[70vh] flex-col items-start justify-center">
      <p className="font-mono-technical text-xs tracking-[0.2em] text-ink-muted uppercase">
        404 — not found
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">
        This route doesn&apos;t exist.
      </h1>
      <p className="mt-3 max-w-[44ch] text-ink-secondary">
        The page may have moved during a redesign. Everything worth seeing is
        reachable from the homepage.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 font-mono-technical text-[12.5px] font-medium text-white transition-colors hover:bg-accent-bright hover:text-background"
      >
        ← Back home
      </Link>
    </main>
  );
}
