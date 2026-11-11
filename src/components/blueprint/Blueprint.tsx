import { useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { flows, blueprintIntro, type BpFlow, type BpNode, type BpScenario, type Pt } from "../../content/blueprint";

const W = 170;
const H = 64;
const SPEED = 240; // viewBox units per second

const TONE: Record<BpScenario["tone"], string> = {
    cyan: "var(--bp-cyan)",
    amber: "var(--bp-amber)",
    green: "var(--bp-green)",
    rose: "var(--bp-rose)",
};

const KIND_ACCENT: Record<BpNode["kind"], string> = {
    step: "var(--bp-cyan)",
    money: "var(--bp-amber)",
    ok: "var(--bp-green)",
    fail: "var(--bp-rose)",
    aside: "var(--bp-muted)",
};

const toPath = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
const pathLength = (pts: Pt[]) =>
    pts.slice(1).reduce((sum, [x, y], i) => sum + Math.hypot(x - pts[i][0], y - pts[i][1]), 0);

function box(n: BpNode) {
    const h = n.h ?? H;
    return { x: n.x - W / 2, y: n.y - h / 2, w: W, h };
}
const touches = (n: BpNode, [px, py]: Pt) => {
    const b = box(n);
    return px >= b.x - 1 && px <= b.x + b.w + 1 && py >= b.y - 1 && py <= b.y + b.h + 1;
};

export default function Blueprint() {
    const reduce = useReducedMotion();
    const [flowId, setFlowId] = useState(flows[0].id);
    const flow = flows.find((f) => f.id === flowId) as BpFlow;
    const [scenarioId, setScenarioId] = useState(flow.scenarios[0].id);
    const scenario = flow.scenarios.find((s) => s.id === scenarioId) ?? flow.scenarios[0];
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = flow.nodes.find((n) => n.id === selectedId) ?? null;

    // Cheap (a dozen nodes); the React Compiler memoises this for us.
    const litEdges = new Set(scenario.edges);
    const litPoints: Pt[] = [...scenario.route, ...flow.edges.filter((e) => litEdges.has(e.id)).flatMap((e) => e.points)];
    const litNodes = new Set(flow.nodes.filter((n) => litPoints.some((p) => touches(n, p))).map((n) => n.id));

    const route = toPath(scenario.route);
    const dur = Math.max(2.2, pathLength(scenario.route) / SPEED);
    const tone = TONE[scenario.tone];

    const pickFlow = (id: string) => {
        const next = flows.find((f) => f.id === id) as BpFlow;
        setFlowId(id);
        setScenarioId(next.scenarios[0].id);
        setSelectedId(null);
    };
    const onNodeKey = (e: KeyboardEvent, id: string) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSelectedId(id);
        }
    };

    return (
        <div className="bp mt-10">
            <p className="bp-eyebrow">{blueprintIntro.eyebrow}</p>
            <h3 className="mt-1 text-2xl md:text-3xl">{blueprintIntro.heading}</h3>
            <p className="mt-2 text-muted max-w-3xl">{blueprintIntro.lead}</p>

            {/* Flow tabs */}
            <div role="tablist" aria-label={blueprintIntro.heading} className="mt-6 flex flex-wrap gap-2">
                {flows.map((f) => (
                    <button
                        key={f.id}
                        role="tab"
                        aria-selected={f.id === flowId}
                        onClick={() => pickFlow(f.id)}
                        className={clsx("bp-tab", f.id === flowId && "bp-tab-active")}
                    >
                        {f.tab}
                    </button>
                ))}
            </div>

            <div className="bp-frame mt-4">
                <div className="px-4 pt-4 md:px-6 md:pt-5">
                    <h4 className="text-lg md:text-xl">{flow.title}</h4>
                    <p className="mt-1 text-sm md:text-base text-muted max-w-4xl">{flow.lead}</p>

                    {/* Scenario picker */}
                    <div className="mt-4 flex flex-wrap items-center gap-2" role="radiogroup" aria-label={blueprintIntro.scenarioLabel}>
                        <span className="bp-mono text-xs uppercase tracking-wider text-muted mr-1">{blueprintIntro.scenarioLabel}</span>
                        {flow.scenarios.map((s) => (
                            <button
                                key={s.id}
                                role="radio"
                                aria-checked={s.id === scenario.id}
                                onClick={() => setScenarioId(s.id)}
                                className={clsx("bp-chip", s.id === scenario.id && "bp-chip-active")}
                                style={{ ["--chip" as string]: TONE[s.tone] }}
                            >
                                <span className="bp-dot" aria-hidden="true" />
                                {s.label}
                            </button>
                        ))}
                    </div>
                    <p className="mt-3 text-sm" aria-live="polite">
                        <span className="bp-mono" style={{ color: tone }}>▸ </span>
                        {scenario.summary}
                    </p>
                </div>

                <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-0">
                    {/* Diagram */}
                    <div className="bp-scroll" tabIndex={-1}>
                        <svg
                            key={flow.id}
                            viewBox={`0 0 1000 ${flow.height}`}
                            className="bp-svg"
                            role="group"
                            aria-label={flow.title}
                        >
                            <defs>
                                <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M20 0H0V20" fill="none" stroke="var(--bp-grid)" strokeWidth="1" />
                                </pattern>
                                <marker id="bp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M0 0L10 5L0 10z" fill="var(--bp-line)" />
                                </marker>
                                <marker id="bp-arrow-lit" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M0 0L10 5L0 10z" fill={tone} />
                                </marker>
                                <filter id="bp-glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="4" result="b" />
                                    <feMerge>
                                        <feMergeNode in="b" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <rect width="1000" height={flow.height} fill="url(#bp-grid)" />

                            {/* Edges */}
                            {flow.edges.map((e, i) => {
                                const lit = litEdges.has(e.id);
                                return (
                                    <g key={e.id}>
                                        <motion.path
                                            d={toPath(e.points)}
                                            fill="none"
                                            stroke={lit ? tone : "var(--bp-line)"}
                                            strokeWidth={lit ? 2 : 1.25}
                                            strokeDasharray={e.dashed ? "5 5" : undefined}
                                            markerEnd={lit ? "url(#bp-arrow-lit)" : "url(#bp-arrow)"}
                                            initial={reduce || e.dashed ? false : { pathLength: 0 }}
                                            whileInView={reduce || e.dashed ? undefined : { pathLength: 1 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: "easeOut" }}
                                        />
                                        {e.label && (
                                            <text
                                                x={e.label.x}
                                                y={e.label.y}
                                                textAnchor={e.label.anchor ?? "start"}
                                                className="bp-edge-label"
                                                fill={lit ? tone : "var(--bp-muted)"}
                                            >
                                                {e.label.text}
                                            </text>
                                        )}
                                    </g>
                                );
                            })}

                            {/* Nodes */}
                            {flow.nodes.map((n) => {
                                const b = box(n);
                                const lit = litNodes.has(n.id);
                                const isSel = n.id === selectedId;
                                const accent = KIND_ACCENT[n.kind];
                                return (
                                    <g
                                        key={n.id}
                                        className="bp-node"
                                        role="button"
                                        tabIndex={0}
                                        aria-pressed={isSel}
                                        aria-label={`${n.title}: ${n.sub}`}
                                        onClick={() => setSelectedId(n.id)}
                                        onKeyDown={(ev) => onNodeKey(ev, n.id)}
                                        opacity={lit || isSel ? 1 : 0.55}
                                    >
                                        <rect
                                            className="bp-frame-rect"
                                            x={b.x}
                                            y={b.y}
                                            width={b.w}
                                            height={b.h}
                                            rx="10"
                                            fill="var(--bp-node)"
                                            stroke={isSel ? accent : lit ? accent : "var(--bp-node-border)"}
                                            strokeWidth={isSel ? 2.5 : lit ? 1.75 : 1}
                                        />
                                        <rect x={b.x} y={b.y + 10} width="3" height={b.h - 20} rx="1.5" fill={accent} />
                                        <text x={n.x} y={b.y + 26} textAnchor="middle" className="bp-node-title">
                                            {n.title}
                                        </text>
                                        <text x={n.x} y={b.y + 44} textAnchor="middle" className="bp-node-sub">
                                            {n.sub}
                                        </text>
                                        {n.lines?.map((line, li) => (
                                            <text key={line} x={b.x + 16} y={b.y + 68 + li * 16} className="bp-node-line">
                                                · {line}
                                            </text>
                                        ))}
                                    </g>
                                );
                            })}

                            {/* Packet */}
                            {!reduce && (
                                <g key={`${flow.id}-${scenario.id}`} filter="url(#bp-glow)" pointerEvents="none">
                                    <circle r="7" fill={tone}>
                                        <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={route} />
                                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.9;1" dur={`${dur}s`} repeatCount="indefinite" />
                                    </circle>
                                </g>
                            )}
                        </svg>
                    </div>

                    {/* Phone layout: the scenario as a tappable list of steps */}
                    <div className="px-4 pb-4 lg:hidden">
                        <p className="bp-mono mb-2 text-xs uppercase tracking-wider text-faint">{blueprintIntro.stepsLabel}</p>
                        <ol className="space-y-1.5">
                            {scenario.steps.map((id, i) => {
                                const n = flow.nodes.find((x) => x.id === id);
                                if (!n) return null;
                                return (
                                    <li key={id}>
                                        <button type="button" className="bp-step" aria-pressed={id === selectedId} onClick={() => setSelectedId(id)}>
                                            <span className="bp-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                                            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: KIND_ACCENT[n.kind] }} aria-hidden="true" />
                                            <span className="shrink-0 whitespace-nowrap font-medium text-ink">{n.title}</span>
                                            <span className="bp-mono ml-auto min-w-0 truncate text-xs text-muted">{n.sub}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>

                    {/* Detail panel */}
                    <aside className="bp-panel" aria-live="polite">
                        {selected ? (
                            <>
                                <p className="bp-mono text-xs uppercase tracking-wider" style={{ color: KIND_ACCENT[selected.kind] }}>
                                    {selected.sub}
                                </p>
                                <h5 className="mt-1 text-lg">{selected.title}</h5>
                                <div className="mt-2 space-y-2 text-sm text-muted">
                                    {selected.detail.map((d) => (
                                        <p key={d}>{d}</p>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-muted">{blueprintIntro.detailEmpty}</p>
                        )}
                    </aside>
                </div>
                <p className="bp-hint px-4 pb-3 text-xs text-muted lg:hidden">{blueprintIntro.hint}</p>
            </div>
        </div>
    );
}
