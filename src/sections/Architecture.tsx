import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import RichText from "../components/ui/RichText";
import Blueprint from "../components/blueprint/Blueprint";
import { Reveal } from "../components/motion/Reveal";
import { architecture, chapters } from "../content/site";

export default function Architecture() {
    return (
        <section id="architecture">
            <Container>
                <SectionHeading title={architecture.heading} eyebrow={chapters.architecture} />

                <Blueprint />

                <div className="mt-10 grid gap-4 md:grid-cols-2">
                    {architecture.paragraphs.map((p, i) => (
                        <Reveal key={i} delay={i * 0.05}>
                            <div className="h-full border-l-2 border-[color-mix(in_srgb,var(--accent)_45%,transparent)] py-1 pl-5 leading-relaxed text-muted">
                                <RichText runs={p} />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}
