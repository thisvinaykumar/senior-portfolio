#!/usr/bin/env node
/**
 * Zero-data-loss guard for the portfolio redesign.
 *
 *   node scripts/content-parity.mjs snapshot [dir]   record the baseline from a built dist/
 *   node scripts/content-parity.mjs check    [dir]   fail if anything in the baseline is gone
 *
 * It serves the built site, renders it in headless Edge/Chrome (so React has run),
 * and compares:
 *   - every visible text node of the baseline must still appear in the page text
 *     (whitespace-normalised substring match, so re-wrapping text in new markup is fine)
 *   - every link target (a[href]) must still be present
 *   - <title>, every <meta content> and <link rel=canonical> must be unchanged
 *   - the JSON-LD blocks must be deep-equal (14 sameAs URLs included)
 *
 * A string may only be dropped on purpose: add it to scripts/content-parity.allow.json
 * with a reason. Nothing is dropped silently.
 */
import { createServer } from "node:http";
import { readFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { join, extname, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const BASELINE = join(HERE, "content-baseline.json");
const ALLOW = join(HERE, "content-parity.allow.json");

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json",
  ".pdf": "application/pdf", ".xml": "application/xml", ".txt": "text/plain",
};

function serve(dir) {
  return new Promise((ok) => {
    const server = createServer(async (req, res) => {
      const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
      let file = join(dir, path);
      try {
        if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      } catch {
        file = join(dir, "index.html"); // SPA fallback
      }
      try {
        const body = await readFile(file);
        res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
        res.end(body);
      } catch {
        res.writeHead(404).end();
      }
    });
    server.listen(0, "127.0.0.1", () => ok(server));
  });
}

function findBrowser() {
  const candidates = [
    process.env.BROWSER_PATH,
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  const hit = candidates.find((p) => existsSync(p));
  if (!hit) throw new Error("No Edge/Chrome found. Set BROWSER_PATH.");
  return hit;
}

function dumpDom(url) {
  return new Promise((ok, fail) => {
    execFile(
      findBrowser(),
      ["--headless=new", "--disable-gpu", "--no-first-run", "--virtual-time-budget=8000", "--dump-dom", url],
      { maxBuffer: 64 * 1024 * 1024, timeout: 90_000 },
      (err, stdout) => (err && !stdout ? fail(err) : ok(stdout)),
    );
  });
}

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", middot: "·", copy: "©", mdash: "—", ndash: "–", rarr: "→" };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") return String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENT[e.toLowerCase()] ?? m;
  });
const norm = (s) => decode(s).replace(/\s+/g, " ").trim();

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return m ? decode(m[2] ?? m[3]) : null;
}

function extract(html) {
  const jsonLd = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => JSON.parse(m[1]));
  const title = norm((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "");
  const meta = {};
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const key = attr(tag, "name") || attr(tag, "property") || attr(tag, "http-equiv");
    const content = attr(tag, "content");
    if (key && content != null) meta[key] = content;
  }
  const canonical = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map(([t]) => t)
    .filter((t) => (attr(t, "rel") || "").toLowerCase() === "canonical")
    .map((t) => attr(t, "href"));
  const hrefs = [...new Set([...html.matchAll(/<a\b[^>]*>/gi)].map(([t]) => attr(t, "href")).filter(Boolean))].sort();

  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [, html])[1]
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
  const texts = [...new Set(body.split(/<[^>]+>/).map(norm).filter((t) => t && /[\p{L}\p{N}]/u.test(t)))];
  const fullText = norm(body.replace(/<[^>]+>/g, " "));
  return { title, meta, canonical, jsonLd, hrefs, texts, fullText };
}

async function render(dir) {
  const abs = resolve(ROOT, dir);
  if (!existsSync(join(abs, "index.html"))) throw new Error(`${abs}/index.html not found — run npm run build first`);
  const server = await serve(abs);
  try {
    const url = `http://127.0.0.1:${server.address().port}/`;
    const html = await dumpDom(url);
    const page = extract(html);
    if (page.texts.length < 20) throw new Error(`Only ${page.texts.length} text nodes rendered — did React mount?`);
    return page;
  } finally {
    server.close();
  }
}

const sameJson = (a, b) => JSON.stringify(a) === JSON.stringify(b);

async function main() {
  const [mode = "check", dir = "dist"] = process.argv.slice(2);
  const page = await render(dir);

  if (mode === "snapshot") {
    const { fullText, ...baseline } = page;
    await writeFile(BASELINE, JSON.stringify({ recordedAt: new Date().toISOString(), ...baseline }, null, 2) + "\n");
    const sameAs = page.jsonLd.flatMap((b) => [b, ...(b["@graph"] || [])]).flatMap((n) => n.sameAs || []);
    console.log(`Baseline recorded: ${page.texts.length} text nodes, ${page.hrefs.length} links, ${Object.keys(page.meta).length} meta, ${page.jsonLd.length} JSON-LD block(s), ${sameAs.length} sameAs URLs.`);
    return;
  }

  const base = JSON.parse(await readFile(BASELINE, "utf8"));
  const allow = existsSync(ALLOW) ? JSON.parse(await readFile(ALLOW, "utf8")) : { texts: {}, hrefs: {} };
  const problems = [];

  const missingTexts = base.texts.filter((t) => !page.fullText.includes(t) && !(t in (allow.texts || {})));
  const missingHrefs = base.hrefs.filter((h) => !page.hrefs.includes(h) && !(h in (allow.hrefs || {})));
  missingTexts.forEach((t) => problems.push(`text  : ${t.length > 140 ? t.slice(0, 140) + "…" : t}`));
  missingHrefs.forEach((h) => problems.push(`link  : ${h}`));
  if (base.title !== page.title) problems.push(`title : "${base.title}" → "${page.title}"`);
  for (const [k, v] of Object.entries(base.meta)) if (page.meta[k] !== v) problems.push(`meta  : ${k} changed or missing`);
  if (!sameJson(base.canonical, page.canonical)) problems.push(`canonical changed: ${page.canonical.join(", ")}`);
  if (!sameJson(base.jsonLd, page.jsonLd)) problems.push("JSON-LD changed (sameAs / entity data must stay identical)");

  const allowed = Object.keys(allow.texts || {}).length + Object.keys(allow.hrefs || {}).length;
  console.log(`Checked ${base.texts.length} text nodes, ${base.hrefs.length} links, ${Object.keys(base.meta).length} meta, ${base.jsonLd.length} JSON-LD block(s); ${allowed} deliberate removal(s) allowed.`);
  if (problems.length) {
    console.error(`\nCONTENT PARITY FAILED — ${problems.length} item(s) missing:\n  ` + problems.join("\n  "));
    process.exit(1);
  }
  console.log("Content parity OK — nothing from the baseline is missing.");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(2);
});
