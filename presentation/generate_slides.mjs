/**
 * Generates copilot-actions-overview.pptx — a 3-slide deck for the live demo.
 * GitHub Primer dark theme. Reproducible: `node generate_slides.mjs`.
 */
import PptxGenJS from "pptxgenjs";

// GitHub Primer palette (hex without leading '#')
const C = {
  canvas: "0D1117",   // dark canvas background
  surface: "161B22",  // raised surface / cards
  border: "30363D",   // subtle borders
  text: "E6EDF3",     // primary text
  muted: "8B949E",    // secondary text
  blue: "58A6FF",     // links / CTA
  green: "3FB950",    // Actions / success
  purple: "A371F7",   // Copilot
  white: "FFFFFF",
};

const FONT = "Helvetica";
const pptx = new PptxGenJS();
pptx.defineLayout({ name: "GH16x9", width: 13.333, height: 7.5 });
pptx.layout = "GH16x9";
pptx.author = "Interview Demo";
pptx.company = "GitHub";
pptx.title = "From Prompt to Production: GitHub Copilot + Actions";

const W = 13.333;
const H = 7.5;

// Reusable dark background + a top accent rule
function base(slide, accent) {
  slide.background = { color: C.canvas };
  slide.addShape("rect", { x: 0, y: 0, w: W, h: 0.12, fill: { color: accent } });
  // footer
  slide.addText("GitHub Copilot + GitHub Actions  ·  Live Demo", {
    x: 0.6, y: H - 0.5, w: 9, h: 0.3, fontFace: FONT, fontSize: 10, color: C.muted, align: "left",
  });
}

// Simple GitHub "Invertocat"-style mark drawn with shapes (rounded square + dot)
function ghMark(slide, x, y, size, color) {
  slide.addShape("roundRect", { x, y, w: size, h: size, rectRadius: size * 0.45,
    fill: { color }, line: { type: "none" } });
  slide.addShape("ellipse", { x: x + size * 0.32, y: y + size * 0.34, w: size * 0.12, h: size * 0.16,
    fill: { color: C.canvas } });
  slide.addShape("ellipse", { x: x + size * 0.56, y: y + size * 0.34, w: size * 0.12, h: size * 0.16,
    fill: { color: C.canvas } });
}

// Pill/badge
function badge(slide, x, y, text, color) {
  slide.addText(text, {
    x, y, w: 2.2, h: 0.42, fontFace: FONT, fontSize: 12, bold: true, color: C.canvas,
    align: "center", valign: "middle", fill: { color }, rectRadius: 0.21, shape: "roundRect",
  });
}

// ---------- Slide 1: Title / Agenda ----------
{
  const s = pptx.addSlide();
  base(s, C.blue);
  ghMark(s, 0.7, 0.7, 0.9, C.white);
  s.addText("GitHub", { x: 1.75, y: 0.72, w: 5, h: 0.9, fontFace: FONT, fontSize: 30, bold: true, color: C.text, valign: "middle" });

  s.addText("From Prompt to Production", {
    x: 0.7, y: 2.3, w: 12, h: 1.0, fontFace: FONT, fontSize: 46, bold: true, color: C.text,
  });
  s.addText([
    { text: "GitHub Copilot ", options: { color: C.purple, bold: true } },
    { text: "+ ", options: { color: C.muted } },
    { text: "GitHub Actions", options: { color: C.green, bold: true } },
  ], { x: 0.7, y: 3.25, w: 12, h: 0.8, fontFace: FONT, fontSize: 30 });

  s.addText("Today's demo", { x: 0.7, y: 4.5, w: 6, h: 0.4, fontFace: FONT, fontSize: 14, bold: true, color: C.muted });
  s.addText([
    { text: "1.  Generate a CI workflow with a Copilot agent — in VS Code\n", options: { breakLine: true } },
    { text: "2.  Commit & push to GitHub\n", options: { breakLine: true } },
    { text: "3.  Watch GitHub Actions build it live", options: {} },
  ], { x: 0.8, y: 4.9, w: 11.5, h: 1.6, fontFace: FONT, fontSize: 20, color: C.text, lineSpacingMultiple: 1.3 });
}

// ---------- Slide 2: GitHub Copilot ----------
{
  const s = pptx.addSlide();
  base(s, C.purple);
  badge(s, 0.7, 0.6, "COPILOT", C.purple);
  s.addText("Your AI pair programmer", {
    x: 0.7, y: 1.15, w: 12, h: 0.9, fontFace: FONT, fontSize: 36, bold: true, color: C.text,
  });
  s.addText("Context-aware AI across the developer workflow — from the editor to the pull request.", {
    x: 0.7, y: 2.0, w: 12, h: 0.5, fontFace: FONT, fontSize: 16, color: C.muted,
  });

  const items = [
    ["Code completions", "Real-time, multi-line suggestions in your IDE."],
    ["Chat & /commands", "Explain, refactor, write tests, fix errors in context."],
    ["Agents", "Delegate whole tasks — Copilot plans, edits files & opens PRs."],
    ["Enterprise-ready", "Org policy, content exclusion, and security shift-left."],
  ];
  items.forEach((it, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.7 + col * 6.1;
    const y = 2.8 + row * 1.85;
    s.addShape("roundRect", { x, y, w: 5.8, h: 1.6, rectRadius: 0.12, fill: { color: C.surface }, line: { color: C.border, width: 1 } });
    s.addText(it[0], { x: x + 0.3, y: y + 0.2, w: 5.2, h: 0.5, fontFace: FONT, fontSize: 18, bold: true, color: C.purple });
    s.addText(it[1], { x: x + 0.3, y: y + 0.72, w: 5.2, h: 0.8, fontFace: FONT, fontSize: 14, color: C.text });
  });
}

// ---------- Slide 3: GitHub Actions ----------
{
  const s = pptx.addSlide();
  base(s, C.green);
  badge(s, 0.7, 0.6, "ACTIONS", C.green);
  s.addText("CI/CD, native to GitHub", {
    x: 0.7, y: 1.15, w: 12, h: 0.9, fontFace: FONT, fontSize: 36, bold: true, color: C.text,
  });
  s.addText("Automate build, test, and deploy — triggered by events in your repo.", {
    x: 0.7, y: 2.0, w: 12, h: 0.5, fontFace: FONT, fontSize: 16, color: C.muted,
  });

  // Event -> Workflow -> Jobs/Steps -> Runners flow
  const flow = ["Event", "Workflow", "Jobs / Steps", "Runner"];
  const fx = 0.7, fy = 2.9, bw = 2.7, gap = 0.45, bh = 0.95;
  flow.forEach((label, i) => {
    const x = fx + i * (bw + gap);
    s.addShape("roundRect", { x, y: fy, w: bw, h: bh, rectRadius: 0.12, fill: { color: C.surface }, line: { color: C.green, width: 1.5 } });
    s.addText(label, { x, y: fy, w: bw, h: bh, align: "center", valign: "middle", fontFace: FONT, fontSize: 16, bold: true, color: C.text });
    if (i < flow.length - 1) {
      s.addText("→", { x: x + bw, y: fy, w: gap, h: bh, align: "center", valign: "middle", fontFace: FONT, fontSize: 20, color: C.green });
    }
  });

  const items = [
    ["YAML workflows", "Versioned in .github/workflows — reviewed like any code."],
    ["Marketplace + runners", "Thousands of reusable actions; hosted or self-hosted runners."],
    ["Secure by design", "Least-privilege GITHUB_TOKEN, OIDC, SHA-pinned actions."],
    ["The tie-in", "Copilot writes the YAML — Actions runs it on every push."],
  ];
  items.forEach((it, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.7 + col * 6.1;
    const y = 4.3 + row * 1.35;
    s.addText([
      { text: it[0] + "  —  ", options: { bold: true, color: C.green } },
      { text: it[1], options: { color: C.text } },
    ], { x, y, w: 5.9, h: 1.2, fontFace: FONT, fontSize: 14, valign: "top", lineSpacingMultiple: 1.1 });
  });
}

const out = "copilot-actions-overview.pptx";
await pptx.writeFile({ fileName: out });
console.log("Wrote " + out);
