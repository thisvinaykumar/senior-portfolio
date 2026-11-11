import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/motion";
import { projectsSection } from "../content/site";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { projects } from "../content/projects";

export default function Projects() {
    return (
        <section id="projects">
            <Container>
                <SectionHeading title={projectsSection.heading} />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mt-8 grid md:grid-cols-2 gap-8"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            variants={fadeInUp}
                            className="bg-card p-6 rounded-xl border border-slate-700 hover:border-primary transition"
                        >
                            <h3 className="text-xl font-semibold">{project.title}</h3>
                            {project.role && <p className="mt-1 text-sm text-primary">{project.role}</p>}
                            <p className="mt-2 text-muted">{project.description}</p>

                            <ul className="mt-3 list-disc list-inside text-muted space-y-1">
                                {project.highlights.map((h) => (
                                    <li key={h}>{h}</li>
                                ))}
                            </ul>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 skill-pill  rounded-full text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4 flex gap-4">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        {projectsSection.github}
                                    </a>
                                )}
                                {project.liveDemo && (
                                    <a
                                        href={project.liveDemo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        {projectsSection.liveDemo}
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
