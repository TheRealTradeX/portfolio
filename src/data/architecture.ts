import type { ArchEdge, ArchNode } from "@/components/ArchitectureField";

/**
 * The real Velocity platform topology — every node is a system verified in
 * VF-Client-Dashboard (see docs/portfolio-evidence.md). Used by the hero
 * field and the case-study diagram.
 */
export const velocityNodes: ArchNode[] = [
  { id: "web", label: "web app", x: 50, y: 26, kind: "core" },
  { id: "worker", label: "worker", x: 30, y: 44, kind: "service" },
  { id: "realtime", label: "realtime", x: 70, y: 44, kind: "service" },
  { id: "db", label: "postgres", x: 50, y: 50, kind: "core" },
  { id: "redis", label: "redis", x: 30, y: 12, kind: "service" },
  { id: "payments", label: "payments", x: 12, y: 26, kind: "external" },
  { id: "email", label: "email", x: 12, y: 50, kind: "external" },
  { id: "market", label: "market data", x: 88, y: 26, kind: "external" },
  { id: "ai", label: "openai", x: 70, y: 10, kind: "external" },
  { id: "site", label: "marketing", x: 88, y: 50, kind: "external" },
];

export const velocityEdges: ArchEdge[] = [
  { from: "payments", to: "web", packets: 2 },
  { from: "web", to: "db", packets: 2 },
  { from: "web", to: "redis", packets: 1 },
  { from: "redis", to: "worker", packets: 1 },
  { from: "worker", to: "db", packets: 1 },
  { from: "worker", to: "email", packets: 1 },
  { from: "market", to: "realtime", packets: 2 },
  { from: "realtime", to: "db", packets: 1 },
  { from: "ai", to: "web", packets: 1 },
  { from: "site", to: "web", packets: 1 },
];
