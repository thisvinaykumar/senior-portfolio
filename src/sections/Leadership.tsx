import { BookOpenCheck, GitPullRequest, Target, Users, type LucideIcon } from "lucide-react";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Spotlight from "../components/motion/Spotlight";
import { Reveal } from "../components/motion/Reveal";
import { chapters, leadership } from "../content/site";

const ICONS: LucideIcon[] = [Users, GitPullRequest, Target, BookOpenCheck];

export default function Leadership() {
    return (
        <section id="leadership">
            <Container>
                <SectionHeading title={leadership.heading} eyebrow={chapters.leadership} />
                <div className="grid gap-4 md:grid-cols-2">
                    {leadership.paragraphs.map((p, i) => {
                        const Icon = ICONS.at(i) ?? Users;
                        return (
                            <Reveal key={p} delay={(i % 2) * 0.06}>
                                <Spotlight className="flex h-full gap-4 p-6">
                                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-accent">
                                        <Icon size={18} aria-hidden="true" />
                                    </span>
                                    <p className="leading-relaxed text-muted">{p}</p>
                                </Spotlight>
                            </Reveal>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
