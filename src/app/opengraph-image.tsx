import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#07090d",
          color: "#f5f7fb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#79859a",
            letterSpacing: 4,
          }}
        >
          JEFREY.PERALTA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700 }}>
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 42,
              color: "#89a6ff",
              marginTop: 8,
            }}
          >
            {siteConfig.role}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#a5afbd",
              marginTop: 28,
              maxWidth: 900,
            }}
          >
            I build the systems businesses actually run on — payments, trading
            operations, internal CRMs, and AI-assisted analytics.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 22,
            color: "#79859a",
          }}
        >
          <span>237 API routes in production</span>
          <span>83-table Postgres schema</span>
          <span>Sole engineer</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
