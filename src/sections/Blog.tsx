import { ArrowUpRight } from "lucide-react";
import { FaMedium } from "react-icons/fa";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Spotlight from "../components/motion/Spotlight";
import { Reveal } from "../components/motion/Reveal";
import { blog, chapters } from "../content/site";

export default function Blog() {
    return (
        <section id="blog">
            <Container>
                <SectionHeading title={blog.heading} subtitle={blog.subtitle} eyebrow={chapters.blog} />
                <Reveal>
                    <Spotlight className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-10">
                        <div>
                            <p className="text-lg leading-relaxed text-muted">{blog.intro}</p>
                            <ul className="bullet-list mt-4 space-y-2 text-ink">
                                {blog.topics.map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                        </div>
                        <a href={blog.cta.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <FaMedium size={17} aria-hidden="true" />
                            {blog.cta.label}
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                    </Spotlight>
                </Reveal>
            </Container>
        </section>
    );
}
