import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileDown, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Container from "../components/layout/Container";
import RichText from "../components/ui/RichText";
import Counter from "../components/motion/Counter";
import { profile } from "../content/profile";
import { hero, resumeUrl } from "../content/site";
import { useUi } from "../state/ui";
import { paletteKey } from "../utils/nav";

const EASE = [0.22, 1, 0.36, 1] as const;

function Terminal() {
    const reduce = useReducedMotion();
    return (
        <div className="glass overflow-hidden" style={{ background: "var(--surface-solid)" }}>
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
                <span className="ml-2 font-mono text-xs text-faint">{hero.terminal.title}</span>
            </div>
            <div className="space-y-1.5 p-5 font-mono text-[0.8rem] leading-relaxed md:text-[0.85rem]">
                {hero.terminal.lines.map((line, i) => (
                    <motion.p
                        key={i}
                        initial={reduce ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: reduce ? 0 : 0.5 + i * 0.32, ease: EASE }}
                        className={
                            line.kind === "cmd" ? "text-ink" : line.kind === "ok" ? "text-green" : "text-muted"
                        }
                    >
                        {line.kind === "cmd" && <span className="mr-2 select-none text-accent">$</span>}
                        {line.text}
                    </motion.p>
                ))}
                <p className="text-ink" aria-hidden="true">
                    <span className="mr-2 text-accent">$</span>
                    <span className="caret" />
                </p>
            </div>
        </div>
    );
}

export default function Hero() {
    const setPaletteOpen = useUi((s) => s.setPaletteOpen);
    const reduce = useReducedMotion();
    const up = (delay: number) =>
        reduce
            ? {}
            : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: EASE } };

    return (
        <section id="hero" className="relative flex min-h-[100svh] items-center !pb-12 !pt-28 md:!pt-32">
            <Container>
                <div className="grid items-center gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <motion.p {...up(0)} className="chip mb-6 !text-[0.75rem]">
                            <span className="relative flex h-2 w-2" aria-hidden="true">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60 motion-reduce:hidden" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
                            </span>
                            {hero.status}
                        </motion.p>

                        <motion.h1 {...up(0.05)} className="text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl">
                            <span className="text-gradient">{hero.name}</span>
                            <span className="mt-4 block text-xl font-medium leading-snug tracking-[-0.01em] text-ink sm:text-2xl">{hero.role}</span>
                        </motion.h1>

                        <motion.p {...up(0.12)} className="mt-5 text-lg text-ink md:text-xl">
                            {hero.tagline}
                        </motion.p>

                        <motion.p {...up(0.18)} className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                            <RichText runs={hero.intro} />
                        </motion.p>

                        <motion.div {...up(0.26)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                            <a href={hero.ctaContact.href} aria-label={hero.ctaContact.aria} className="btn btn-primary">
                                <Mail size={17} aria-hidden="true" />
                                {hero.ctaContact.label}
                            </a>
                            <a href={resumeUrl} download aria-label={hero.ctaResume.aria} className="btn btn-ghost">
                                <FileDown size={17} aria-hidden="true" />
                                <span>{hero.ctaResume.label}</span>
                            </a>
                            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label={hero.ctaGithub.aria} className="btn btn-ghost">
                                <FaGithub size={16} aria-hidden="true" />
                                {hero.ctaGithub.label}
                            </a>
                        </motion.div>

                        <motion.p {...up(0.34)} className="mt-6 hidden items-center gap-2 text-sm text-faint sm:flex">
                            {hero.paletteHint.before}
                            <button type="button" onClick={() => setPaletteOpen(true)} className="kbd hover:text-ink">
                                {paletteKey}
                            </button>
                            {hero.paletteHint.after}
                        </motion.p>
                    </div>

                    <motion.div {...up(0.3)} className="lg:col-span-5">
                        <Terminal />
                    </motion.div>
                </div>

                {/* Metrics */}
                <div className="mt-16 md:mt-20">
                    <p className="eyebrow mb-4 !text-faint">{hero.metricsLabel}</p>
                    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-[var(--border)] md:grid-cols-3 lg:grid-cols-6">
                        {hero.metrics.map((m) => (
                            <div key={m.label} className="bg-[var(--bg-elev)] p-5">
                                <dt className="sr-only">{m.label}</dt>
                                <dd>
                                    <span className="block font-mono text-3xl font-semibold tracking-tight text-ink md:text-[2rem]">
                                        <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                                    </span>
                                    <span className="mt-2 block text-[0.8rem] leading-snug text-muted" aria-hidden="true">
                                        {m.label}
                                    </span>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <a href="#summary" className="mx-auto mt-12 hidden w-fit flex-col items-center gap-1 text-xs text-faint hover:text-ink md:flex">
                    {hero.scrollCue}
                    <ArrowDown size={14} className="motion-safe:animate-bounce" aria-hidden="true" />
                </a>
            </Container>
        </section>
    );
}
