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

// ---------- Slide 1: Title ----------
{
  const s = pptx.addSlide();
  base(s, C.blue);
  s.addImage({ path: "../Assets/github-copilot-logo.png", x: 0.7, y: 0.74, w: 0.95, h: 0.77 });
  s.addText("GitHub Copilot", { x: 1.8, y: 0.72, w: 6, h: 0.9, fontFace: FONT, fontSize: 30, bold: true, color: C.text, valign: "middle" });

  s.addText("From Prompt to Production", {
    x: 0.7, y: 2.3, w: 12, h: 1.0, fontFace: FONT, fontSize: 46, bold: true, color: C.text,
  });
  s.addText([
    { text: "GitHub Copilot ", options: { color: C.purple, bold: true } },
    { text: "+ ", options: { color: C.muted } },
    { text: "GitHub Actions", options: { color: C.green, bold: true } },
  ], { x: 0.7, y: 3.25, w: 12, h: 0.8, fontFace: FONT, fontSize: 30 });

  // Presenter (under the subtitle — matching the title/subtitle left alignment and rhythm)
  s.addText([
    { text: "Roshawn Reid\n", options: { bold: true, color: C.blue, fontSize: 20, breakLine: true } },
    { text: "Solution Engineer", options: { color: C.muted, fontSize: 15 } },
  ], { x: 0.7, y: 4.2, w: 12, h: 1.0, fontFace: FONT, align: "left", valign: "top", lineSpacingMultiple: 0.9 });
}

// ---------- Slide 2: Agenda ----------
{
  const s = pptx.addSlide();
  base(s, C.blue);
  badge(s, 0.7, 0.6, "AGENDA", C.blue);
  s.addText("What we'll cover", {
    x: 0.7, y: 1.15, w: 12, h: 0.9, fontFace: FONT, fontSize: 36, bold: true, color: C.text,
  });

  const agenda = [
    ["01", "GitHub Copilot", "Your AI pair programmer — completions, chat, and agents.", C.purple],
    ["02", "Customizing Copilot", "The primitives that ground Copilot in your repo and team.", C.blue],
    ["03", "GitHub Actions", "CI/CD native to GitHub — events, workflows, runners.", C.green],
    ["04", "Live demo", "Generate a workflow with an agent, push it, watch it run.", C.text],
  ];
  agenda.forEach((it, i) => {
    const y = 2.45 + i * 1.05;
    s.addText(it[0], { x: 0.7, y, w: 1.0, h: 0.9, fontFace: FONT, fontSize: 34, bold: true, color: it[3], valign: "middle" });
    s.addShape("line", { x: 1.85, y: y + 0.05, w: 0, h: 0.8, line: { color: C.border, width: 1.5 } });
    s.addText(it[1], { x: 2.1, y: y + 0.02, w: 10.5, h: 0.5, fontFace: FONT, fontSize: 20, bold: true, color: C.text });
    s.addText(it[2], { x: 2.1, y: y + 0.5, w: 10.5, h: 0.4, fontFace: FONT, fontSize: 14, color: C.muted });
  });
}

// ---------- Slide 3: GitHub Copilot ----------
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

// ---------- Slide 4: Customization Primitives ----------
{
  const s = pptx.addSlide();
  base(s, C.blue);
  badge(s, 0.7, 0.5, "PRIMITIVES", C.blue);
  s.addText("Customizing Copilot for your repo", {
    x: 0.7, y: 1.0, w: 12, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: C.text,
  });

  const head = ["Primitive", "Primary Job", "Where It Enters the Loop", "Best Used For"];
  const rows = [
    ["Always-on Instructions", "Base defaults", "Context assembly", "Team-wide conventions and stack choices"],
    ["File-based Instructions", "Scoped defaults", "Context assembly for matching files", "Path-specific rules"],
    ["Prompts", "Explicit task framing", "Task shaping", "User-invoked templates"],
    ["Skills", "Reusable procedure", "Task shaping and decision support", "Repeatable, discoverable workflows"],
    ["Custom Agents", "Persistent role and posture", "Task shaping across a conversation", "Reviewer, architect, deployer, mentor modes"],
    ["MCP", "External reach", "Action selection and tool execution", "APIs, databases, issue trackers, internal systems"],
    ["Hooks", "Enforcement and audit", "Lifecycle boundaries around execution", "Deny, inspect, log, or constrain risky actions"],
    ["Memory", "Learned repo knowledge", "Context assembly and reasoning", "Patterns hard to author but easy to observe"],
  ];

  const headerRow = head.map((h) => ({
    text: h,
    options: { bold: true, color: C.canvas, fill: { color: C.blue }, fontSize: 12, valign: "middle" },
  }));
  const bodyRows = rows.map((r, i) => {
    const rowFill = i % 2 === 0 ? C.surface : C.canvas;
    return r.map((cell, c) => ({
      text: cell,
      options: {
        color: c === 0 ? C.blue : C.text,
        bold: c === 0,
        fill: { color: rowFill },
        fontSize: 11,
        valign: "middle",
      },
    }));
  });

  s.addTable([headerRow, ...bodyRows], {
    x: 0.6, y: 1.85, w: 12.1, h: 5.0,
    colW: [2.5, 2.4, 3.5, 3.7],
    border: { type: "solid", color: C.border, pt: 1 },
    fontFace: FONT,
    align: "left",
    margin: [3, 5, 3, 5],
    autoPage: false,
  });
}

// ---------- Slide 5: GitHub Actions ----------
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
