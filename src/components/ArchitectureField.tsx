import type { CSSProperties } from "react";

export type ArchNode = {
  id: string;
  label: string;
  x: number; // 0–100 viewBox units
  y: number; // 0–60 viewBox units
  kind?: "core" | "service" | "external";
};

export type ArchEdge = {
  from: string;
  to: string;
  packets?: number;
};

type Props = {
  nodes: ArchNode[];
  edges: ArchEdge[];
  title: string;
  className?: string;
};

/**
 * The signature visual: a system-architecture graph rendered as
 * server-side SVG. Packet motion uses CSS offset-path animation only —
 * no JavaScript, and `prefers-reduced-motion` freezes it via the global
 * motion rules. Decorative: hidden from assistive technology, with the
 * title provided for context where the parent chooses to show it.
 */
export function ArchitectureField({ nodes, edges, title, className }: Props) {
  const byId = new Map(nodes.map((n) => [n.id, n]));

  const paths = edges
    .map((edge) => {
      const a = byId.get(edge.from);
      const b = byId.get(edge.to);
      if (!a || !b) return null;
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2 - 4;
      return {
        d: `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`,
        packets: edge.packets ?? 1,
        key: `${edge.from}-${edge.to}`,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <svg
      viewBox="0 0 100 60"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
      data-title={title}
    >
      <defs>
        <radialGradient id="af-node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5875ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5875ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {paths.map((p) => (
        <path
          key={p.key}
          d={p.d}
          fill="none"
          stroke="rgba(137,166,255,0.16)"
          strokeWidth="0.22"
        />
      ))}

      {paths.map((p) =>
        Array.from({ length: p.packets }, (_, i) => (
          <circle
            key={`${p.key}-pk-${i}`}
            r="0.5"
            fill="#89a6ff"
            opacity="0.85"
            className="af-packet"
            style={
              {
                offsetPath: `path('${p.d}')`,
                animationDelay: `${(i * 4.2 + p.key.length * 0.7) % 8}s`,
                animationDuration: `${6 + (p.key.length % 4)}s`,
              } as CSSProperties
            }
          />
        )),
      )}

      {nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="3.4" fill="url(#af-node-glow)" />
          <circle
            cx={n.x}
            cy={n.y}
            r={n.kind === "core" ? 1.15 : 0.85}
            fill={n.kind === "external" ? "#0c1017" : "#111722"}
            stroke={n.kind === "core" ? "#89a6ff" : "rgba(137,166,255,0.55)"}
            strokeWidth={n.kind === "core" ? 0.28 : 0.18}
          />
          <text
            x={n.x}
            y={n.y + 3.6}
            textAnchor="middle"
            fill={n.kind === "core" ? "#a5afbd" : "#717d8d"}
            fontSize="1.7"
            fontFamily="var(--font-jetbrains), monospace"
            letterSpacing="0.08"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
