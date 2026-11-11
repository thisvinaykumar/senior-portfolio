import { highlightTerms } from "../content/experience";

export interface Highlight {
    /** "Platform integrations:" — the lead-in before the first ": ", colon kept so the sentence stays whole. */
    heading: string | null;
    body: string;
    /** Numbers worth a chip, e.g. "~3,000 commits". Derived from the text; shown in addition to it. */
    metrics: string[];
    /** Suppliers and tools named in the text, in reading order. Derived; shown in addition to it. */
    terms: string[];
}

const METRICS: [RegExp, (m: RegExpMatchArray) => string][] = [
    [/~([\d,]+) commits/, (m) => `~${m[1]} commits`],
    [/(\d+\+) Node\.js microservices/, (m) => `${m[1]} services`],
    [/(\d+\+) pull requests/, (m) => `${m[1]} PRs`],
    [/(\d+)-check\b/, (m) => `${m[1]} checks`],
    [/(\d+\+) backend commits/, (m) => `${m[1]} commits`],
    [/(\d+\+) commits/, (m) => `${m[1]} commits`],
    [/about (\d+) admin components/, (m) => `${m[1]} components`],
    [/\b(\d+) apps\b/, (m) => `${m[1]} apps`],
    [/(\d+\+) backend domains/, (m) => `${m[1]} domains`],
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const TERM_RES = highlightTerms.map((t) => [t, new RegExp(`(?<![\\w.])${escape(t)}(?![\\w])`)] as const);

/**
 * Splits one experience bullet into a scannable row without changing a character of it:
 * heading + " " + body is exactly the original string.
 */
export function toHighlight(point: string): Highlight {
    const i = point.indexOf(": ");
    const lead = i > 2 && i <= 70 ? point.slice(0, i) : "";
    const heading = lead && !lead.includes(";") ? point.slice(0, i + 1) : null;
    const body = heading ? point.slice(i + 2) : point;

    const metrics: string[] = [];
    for (const [re, fmt] of METRICS) {
        const m = point.match(re);
        if (m) {
            const label = fmt(m);
            if (!metrics.includes(label)) metrics.push(label);
        }
        if (metrics.length === 2) break;
    }

    const terms = TERM_RES.map(([t, re]) => [t, point.search(re)] as const)
        .filter(([, at]) => at >= 0)
        .sort((a, b) => a[1] - b[1])
        .map(([t]) => t)
        .slice(0, 8);

    return { heading, body, metrics, terms };
}
