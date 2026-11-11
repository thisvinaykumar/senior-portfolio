import { Cloud, Compass, Database, FlaskConical, Monitor, Server, type LucideIcon } from "lucide-react";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Spotlight from "../components/motion/Spotlight";
import { Reveal } from "../components/motion/Reveal";
import { skills } from "../content/skills";
import { chapters, skillsSection } from "../content/site";

// One icon per group, in the order of src/content/skills.ts (falls back to Compass).
const ICONS: LucideIcon[] = [Server, Monitor, Database, Cloud, FlaskConical, Compass];

export default function Skills() {
    return (
        <section id="skills">
            <Container>
                <SectionHeading title={skillsSection.heading} eyebrow={chapters.skills} />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {skills.map((group, i) => {
                        const Icon = ICONS.at(i) ?? Compass;
                        return (
                            <Reveal key={group.title} delay={(i % 3) * 0.06}>
                                <Spotlight className="h-full p-6">
                                    <div className="flex items-center gap-3">
                                        <span className="grid h-9 w-9 place-items-center rounded-xl border border-line text-accent">
                                            <Icon size={18} aria-hidden="true" />
                                        </span>
                                        <h3 className="text-lg font-semibold">{group.title}</h3>
                                    </div>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {group.items.map((skill) => (
                                            <span key={skill} className="rounded-lg border border-line px-2.5 py-1 text-sm text-muted">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </Spotlight>
                            </Reveal>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
