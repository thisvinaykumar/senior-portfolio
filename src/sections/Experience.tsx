import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/motion";
import { experienceSection } from "../content/site";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { experience } from "../content/experience";

export default function Experience() {
    return (
        <section id="experience">
            <Container>
                <SectionHeading title={experienceSection.heading} />
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mt-8 space-y-8"
                >
                    {experience.map((role) => (
                        <motion.div key={role.company} variants={fadeInUp} className="border-l border-slate-700 pl-6">
                            <h3 className="font-semibold text-lg">{role.title}</h3>
                            <p className="text-muted text-sm">
                                {role.company} · {role.duration}
                            </p>
                            <ul className="list-disc ml-4 mt-3 space-y-2 text-muted">
                                {role.points.map((p) => (
                                    <li key={p}>{p}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
