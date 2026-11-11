import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Spotlight from "../components/motion/Spotlight";
import { Reveal } from "../components/motion/Reveal";
import { experience } from "../content/experience";
import { chapters, experienceSection } from "../content/site";

export default function Experience() {
    const ref = useRef<HTMLOListElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
    const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

    return (
        <section id="experience">
            <Container>
                <SectionHeading title={experienceSection.heading} eyebrow={chapters.experience} />

                <ol ref={ref} className="relative space-y-8 md:space-y-10">
                    {/* the rail, filling as you scroll */}
                    <span className="absolute bottom-2 left-[7px] top-2 w-px bg-[var(--border-strong)] md:left-[calc(16rem+7px)]" aria-hidden="true" />
                    <motion.span
                        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent md:left-[calc(16rem+7px)]"
                        style={{ scaleY: fill }}
                        aria-hidden="true"
                    />

                    {experience.map((role, i) => (
                        <li key={role.company + role.title} className="relative grid gap-3 pl-8 md:grid-cols-[16rem_1fr] md:gap-0 md:pl-0">
                            <span
                                className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-accent bg-[var(--bg)] md:left-[16rem]"
                                style={i === 0 ? { boxShadow: "0 0 0 5px color-mix(in srgb, var(--accent) 22%, transparent)" } : undefined}
                                aria-hidden="true"
                            />
                            <Reveal className="md:pr-10 md:pt-0.5 md:text-right">
                                <p className="font-mono text-sm text-accent">{role.duration}</p>
                            </Reveal>
                            <Reveal delay={0.05} className="md:pl-10">
                                <Spotlight className="p-6 md:p-7">
                                    <h3 className="text-lg font-semibold md:text-xl">{role.title}</h3>
                                    <p className="mt-1 text-sm text-muted">
                                        {role.company} · {role.duration}
                                    </p>
                                    <ul className="bullet-list mt-4 space-y-2.5 text-[0.95rem] leading-relaxed text-muted">
                                        {role.points.map((p) => (
                                            <li key={p}>{p}</li>
                                        ))}
                                    </ul>
                                </Spotlight>
                            </Reveal>
                        </li>
                    ))}
                </ol>
            </Container>
        </section>
    );
}
