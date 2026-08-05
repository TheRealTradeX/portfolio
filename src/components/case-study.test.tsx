import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CaseStudyShell,
  CaseStudyHeader,
  CS,
  EvidenceNote,
  CaseStudyAtAGlance,
  CaseStudyFigure,
  CaseStudyFigureRow,
  CaseStudyDecision,
  CaseStudyDecisionList,
  CaseStudyExpandable,
  type CaseStudyFigureProps,
} from "./case-study";
import type { VisualAsset } from "@/types/content";

const asset: VisualAsset = {
  src: "/work/velocity/velocity-command-center.webp",
  alt: "Admin command center with account queues and payout review",
  width: 1600,
  height: 1000,
};

describe("CaseStudyAtAGlance", () => {
  it("renders definition-list semantics with matching dt/dd pairs", () => {
    const html = renderToStaticMarkup(
      <CaseStudyAtAGlance
        facts={[
          { label: "Status", value: "Live" },
          { label: "Role", value: "Product engineer" },
        ]}
      />,
    );
    expect(html).toContain("<dl");
    expect(html.match(/<dt/g)).toHaveLength(2);
    expect(html.match(/<dd/g)).toHaveLength(2);
  });

  it("renders at most seven facts", () => {
    const facts = Array.from({ length: 10 }, (_, i) => ({
      label: `Label ${i}`,
      value: `Value ${i}`,
    }));
    const html = renderToStaticMarkup(<CaseStudyAtAGlance facts={facts} />);
    expect(html.match(/<dt/g)).toHaveLength(7);
  });
});

describe("CaseStudyFigure", () => {
  it("image mode renders figure, img with alt/dimensions, caption, and disclosure", () => {
    const html = renderToStaticMarkup(
      <CaseStudyFigure
        kind="image"
        image={asset}
        label="Admin command center"
        caption="The operating dashboard for the evaluation business."
        dataDisclosure="Synthetic data"
      />,
    );
    expect(html).toContain("<figure");
    expect(html).toContain("<figcaption");
    expect(html).toContain(`alt="${asset.alt}"`);
    expect(html).toContain('width="1600"');
    expect(html).toContain("Synthetic data");
  });

  it("custom mode exposes the accessible label and visible description", () => {
    const html = renderToStaticMarkup(
      <CaseStudyFigure
        kind="custom"
        accessibleLabel="Webhook idempotency event flow"
        caption="Event flow"
        description="Redelivered webhooks become no-ops via the ledger."
      >
        <svg viewBox="0 0 10 10" />
      </CaseStudyFigure>,
    );
    expect(html).toContain('role="img"');
    expect(html).toContain('aria-label="Webhook idempotency event flow"');
    expect(html).toContain("Redelivered webhooks become no-ops");
  });

  it("figure modes are mutually exclusive and image data is required at the type level", () => {
    // @ts-expect-error image mode requires the full VisualAsset (alt, width, height)
    const missingData: CaseStudyFigureProps = { kind: "image", image: { src: "/x.webp" } };
    // @ts-expect-error custom mode requires an accessible label
    const missingLabel: CaseStudyFigureProps = { kind: "custom", children: null };
    expect(missingData.kind).toBe("image");
    expect(missingLabel.kind).toBe("custom");
  });
});

describe("CaseStudyDecision", () => {
  it("renders an article with an h3 by default and a padded sequence number", () => {
    const html = renderToStaticMarkup(
      <CaseStudyDecision
        number={2}
        title="Money frozen at write time"
        summary="Amounts are stored in integer cents at creation."
        result="Config changes can never rewrite payout history."
      />,
    );
    expect(html).toContain("<article");
    expect(html).toContain("<h3");
    expect(html).toContain("02");
    expect(html).toContain("Result");
  });

  it("supports h4 for nested outlines", () => {
    const html = renderToStaticMarkup(
      <CaseStudyDecision title="Pure decision kernels" headingLevel="h4" />,
    );
    expect(html).toContain("<h4");
    expect(html).not.toContain("<h3");
  });

  it("composes inside the decision-list wrapper", () => {
    const html = renderToStaticMarkup(
      <CaseStudyDecisionList>
        <CaseStudyDecision number={1} title="One" />
        <CaseStudyDecision number={2} title="Two" />
      </CaseStudyDecisionList>,
    );
    expect(html.match(/<article/g)).toHaveLength(2);
  });
});

describe("CaseStudyExpandable", () => {
  it("renders native details/summary with visible title text", () => {
    const html = renderToStaticMarkup(
      <CaseStudyExpandable title="Security controls" summary="Six controls">
        <p>Body</p>
      </CaseStudyExpandable>,
    );
    expect(html).toContain("<details");
    expect(html).toContain("<summary");
    expect(html).toContain("Security controls");
    expect(html).not.toContain("open");
  });

  it("supports defaultOpen", () => {
    const html = renderToStaticMarkup(
      <CaseStudyExpandable title="Deployment" defaultOpen>
        <p>Body</p>
      </CaseStudyExpandable>,
    );
    expect(html).toMatch(/<details[^>]*open/);
  });
});

describe("existing exports stay usable", () => {
  it("renders shell, header, section, and evidence note together", () => {
    const html = renderToStaticMarkup(
      <CaseStudyShell>
        <CaseStudyHeader
          eyebrow="Case study"
          title="Example"
          summary="Summary"
          facts={[{ label: "Status", value: "Live" }]}
        />
        <CS id="problem" title="The problem">
          <p>Body</p>
        </CS>
        <EvidenceNote>
          <p>Note</p>
        </EvidenceNote>
      </CaseStudyShell>,
    );
    expect(html).toContain("<main");
    expect(html).toContain("<h1");
    expect(html).toContain('id="problem"');
    expect(html).toContain("Source access");
  });

  it("figure row lays out multiple figures", () => {
    const html = renderToStaticMarkup(
      <CaseStudyFigureRow>
        <CaseStudyFigure kind="image" image={asset} />
        <CaseStudyFigure kind="image" image={asset} />
      </CaseStudyFigureRow>,
    );
    expect(html.match(/<figure/g)).toHaveLength(2);
  });
});
