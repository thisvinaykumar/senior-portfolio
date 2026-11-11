import SectionHeading from "../components/ui/SectionHeading";
import Container from "../components/layout/Container";
import RichText from "../components/ui/RichText";
import Spotlight from "../components/motion/Spotlight";
import { Reveal } from "../components/motion/Reveal";
import { chapters, summary, summaryLabels } from "../content/site";

export default function Summary() {
    const [lead, ...rest] = summary.paragraphs;
    return (
        <section id="summary">
            <Container>
                <SectionHeading title={summary.heading} eyebrow={chapters.summary} />

                <Reveal>
                    <p className="max-w-5xl text-2xl font-medium leading-snug tracking-tight text-ink md:text-[2.1rem] md:leading-[1.25]">
                        <span className="sr-only">{summaryLabels[0]}: </span>
                        <RichText runs={lead} />
                    </p>
                </Reveal>

                <div className="mt-12 grid gap-4 md:grid-cols-2">
                    {rest.map((p, i) => (
                        <Reveal key={i} delay={i * 0.06}>
                            <Spotlight className="h-full p-6 md:p-7">
                                <p className="eyebrow mb-3 !text-faint">{summaryLabels[i + 1]}</p>
                                <p className="leading-relaxed text-muted">
                                    <RichText runs={p} />
                                </p>
                            </Spotlight>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}
