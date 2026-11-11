import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
    BedDouble, Boxes, Bus, Calculator, CircleDot, CreditCard, GitPullRequest, Handshake, LayoutDashboard, Layers,
    Package, Palette, Plug, Repeat, Rocket, ScanFace, Server, ShieldCheck, Ship, Stamp, Ticket, Wallet,
    type LucideIcon,
} from "lucide-react";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { Reveal } from "../components/motion/Reveal";
import { experience, type Experience as Role } from "../content/experience";
import { chapters, experienceSection } from "../content/site";
import { toHighlight, type Highlight } from "../utils/highlights";

/** First keyword hit wins; checked against the heading, then the whole bullet. */
const ICONS: [RegExp, LucideIcon][] = [
    [/platform integrations|rest apis/i, Plug],
    [/client-facing/i, Handshake],
    [/round trip/i, Repeat],
    [/ferr/i, Ship],
    [/money-safe|double charge/i, ShieldCheck],
    [/hotel/i, BedDouble],
    [/in-house/i, Package],
    [/airport|shuttle|transfer/i, Bus],
    [/checkout|payment/i, CreditCard],
    [/pull requests|engineering practice/i, GitPullRequest],
    [/attendance|face/i, ScanFace],
    [/tenant isolation|rbac/i, Layers],
    [/payroll/i, Calculator],
    [/production|ec2|nginx/i, Server],
    [/monorepo/i, Boxes],
    [/created opsx/i, Rocket],
    [/wallet/i, Wallet],
    [/theming|scss/i, Palette],
    [/voucher|ticket/i, Ticket],
    [/visa/i, Stamp],
    [/portal|dashboard|crm|component/i, LayoutDashboard],
];
const iconFor = (h: Highlight) =>
    ICONS.find(([re]) => re.test(h.heading ?? ""))?.[1] ?? ICONS.find(([re]) => re.test(h.body))?.[1] ?? CircleDot;

export default function Experience() {
    return (
        <section id="experience">
            <Container>
                <SectionHeading title={experienceSection.heading} eyebrow={chapters.experience} />
                <ol className="space-y-14 md:space-y-20">
                    {experience.map((role, i) => (
                        <RoleItem key={role.company + role.title} role={role} first={i === 0} />
                    ))}
                </ol>
            </Container>
        </section>
    );
}

function RoleItem({ role, first }: { role: Role; first: boolean }) {
    const ref = useRef<HTMLLIElement>(null);
    // 0 when the role's top reaches the middle of the screen, 1 when its last bullet has scrolled past.
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 55%", "end 70%"] });
    const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

    const items = role.points.map(toHighlight);
    const lead = items[0] && !items[0].heading ? items[0] : null;
    const rows = lead ? items.slice(1) : items;

    return (
        <li ref={ref} className="relative grid gap-5 pl-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12 lg:pl-0">
            {/* this role's stretch of the timeline, filling as you read it */}
            <span className="absolute bottom-0 left-[7px] top-3 w-px bg-[var(--border-strong)] lg:left-[calc(17rem+1.5rem)]" aria-hidden="true" />
            <motion.span
                className="absolute bottom-0 left-[7px] top-3 w-px origin-top bg-accent lg:left-[calc(17rem+1.5rem)]"
                style={{ scaleY: fill }}
                aria-hidden="true"
            />
            <span
                className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-[var(--bg)] lg:left-[calc(17rem+1.5rem-7px)]"
                style={first ? { boxShadow: "0 0 0 5px color-mix(in srgb, var(--accent) 22%, transparent)" } : undefined}
                aria-hidden="true"
            />

            {/* Role header — pinned beside its bullets on wide screens */}
            <div className="lg:sticky lg:top-24 lg:self-start lg:text-right">
                <h3 className="text-lg font-semibold leading-snug md:text-xl">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                    {role.company}
                    <span className="sr-only"> · </span>{" "}
                    <span className="mt-2 block font-mono text-xs text-accent">{role.duration}</span>
                </p>
                <div className="mt-4 flex items-center gap-3 lg:flex-row-reverse" aria-hidden="true">
                    <div className="h-1 w-full max-w-[10rem] overflow-hidden rounded-full bg-[var(--border)]">
                        <motion.div className="h-full origin-left rounded-full bg-accent lg:origin-right" style={{ scaleX: fill }} />
                    </div>
                    <span className="shrink-0 font-mono text-[0.7rem] text-faint">
                        {role.points.length} {experienceSection.highlights}
                    </span>
                </div>
            </div>

            {/* Highlights */}
            <div className="min-w-0">
                {lead && (
                    <Reveal>
                        <div className="exp-lead">
                            <Pills h={lead} className="mb-3" />
                            <p className="text-[1.02rem] leading-7 text-ink">{lead.body}</p>
                            <Terms terms={lead.terms} />
                        </div>
                    </Reveal>
                )}
                <ul className={lead ? "mt-4 space-y-3" : "space-y-3"}>
                    {rows.map((h) => {
                        const Icon = iconFor(h);
                        return (
                            <Reveal as="li" key={h.body} y={14} className="exp-row">
                                <span className="exp-icon" aria-hidden="true">
                                    <Icon size={16} />
                                </span>
                                <div className="min-w-0 flex-1">
                                    {/* Pills come first in the DOM so heading + body stay one unbroken sentence. */}
                                    <div className="flex flex-wrap items-start gap-x-3 gap-y-1.5">
                                        <Pills h={h} className="order-last sm:ml-auto" />
                                        {h.heading && <p className="font-semibold leading-snug text-ink">{h.heading}</p>}
                                    </div>
                                    <p className={`${h.heading ? "mt-1.5 " : ""}text-[0.94rem] leading-7 text-muted`}>{h.body}</p>
                                    <Terms terms={h.terms} />
                                </div>
                            </Reveal>
                        );
                    })}
                </ul>
            </div>
        </li>
    );
}

function Pills({ h, className = "" }: { h: Highlight; className?: string }) {
    if (!h.metrics.length) return null;
    return (
        <span className={`flex shrink-0 flex-wrap gap-1.5 ${className}`} aria-hidden="true">
            {h.metrics.map((m) => (
                <span key={m} className="exp-metric">
                    {m}
                </span>
            ))}
        </span>
    );
}

function Terms({ terms }: { terms: string[] }) {
    if (!terms.length) return null;
    return (
        <span className="mt-3 flex flex-wrap gap-1.5" aria-hidden="true">
            {terms.map((t) => (
                <span key={t} className="exp-term">
                    {t}
                </span>
            ))}
        </span>
    );
}
