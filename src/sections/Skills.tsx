import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/motion";
import { skillsSection } from "../content/site";
import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import SectionHeading from "../components/ui/SectionHeading";
import { skills } from "../content/skills";


export default function Skills() {
    return (
        <section id="skills">
            <Container>
                <SectionHeading title={skillsSection.heading} />
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid md:grid-cols-3 gap-6 mt-8">
                    {skills.map((group) => (
                        <motion.div key={group.title} variants={fadeInUp}>
                            <Card>
                                {/* <motion.div key={group.title} className="bg-card p-6 rounded-xl"> */}
                                <h3 className="font-semibold text-lg mb-4">{group.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="skill-pill px-3 py-1 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                {/* </motion.div> */}
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
