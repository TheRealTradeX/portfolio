/**
 * Site-wide ambient background: a fine engineering grid that fades out
 * radially, three slow-drifting glow fields, and a faint horizon sweep.
 * Pure CSS (see globals.css) — no canvas, no JS, GPU-composited
 * transforms only, and motion stops under prefers-reduced-motion.
 */
export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
      <div className="ambient-horizon" />
    </div>
  );
}
