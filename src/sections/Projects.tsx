import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Spotlight from "../components/motion/Spotlight";
import { Reveal } from "../components/motion/Reveal";
import { projects, type Project } from "../content/projects";
import { chapters, projectsSection } from "../content/site";

function Links({ project }: { project: Project }) {
    if (!project.github && !project.liveDemo) return null;
    return (
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
            {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
                    <FaGithub size={14} aria-hidden="true" />
                    {projectsSection.github}
                </a>
            )}
            {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
                    {projectsSection.liveDemo}
                    <ArrowUpRight size={14} aria-hidden="true" />
                </a>
            )}
        </div>
    );
}

function Stack({ items }: { items: string[] }) {
    return (
        <div className="mt-5 flex flex-wrap gap-1.5">
            {items.map((tech) => (
                <span key={tech} className="chip">
                    {tech}
                </span>
            ))}
        </div>
    );
}

function ProjectCard({ project, featured, index }: { project: Project; featured: boolean; index: number }) {
    return (
        <Spotlight as="article" className={clsx("flex h-full flex-col p-6 md:p-8", featured && "lg:p-10")}>
            <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-faint">{String(index + 1).padStart(2, "0")}</span>
                {project.role && <span className="chip !text-accent">{project.role}</span>}
            </div>
            <h3 className={clsx("mt-4 font-semibold tracking-tight", featured ? "text-2xl md:text-3xl" : "text-xl md:text-[1.35rem]")}>{project.title}</h3>
            <p className={clsx("mt-3 leading-relaxed text-muted", featured && "md:text-lg")}>{project.description}</p>

            <ul className={clsx("bullet-list mt-5 text-[0.95rem] leading-relaxed text-muted", featured ? "grid gap-x-8 gap-y-3 md:grid-cols-2" : "space-y-2.5")}>
                {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                ))}
            </ul>

            <div className="mt-auto">
                <Stack items={project.techStack} />
                <Links project={project} />
            </div>
        </Spotlight>
    );
}

export default function Projects() {
    const featured = projects.slice(0, 2);
    const rest = projects.slice(2);
    return (
        <section id="projects">
            <Container>
                <SectionHeading title={projectsSection.heading} eyebrow={chapters.projects} />

                <div className="space-y-5">
                    {featured.map((p, i) => (
                        <Reveal key={p.title}>
                            <ProjectCard project={p} featured index={i} />
                        </Reveal>
                    ))}
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                    {rest.map((p, i) => (
                        <Reveal key={p.title} delay={(i % 2) * 0.06}>
                            <ProjectCard project={p} featured={false} index={i + featured.length} />
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}
