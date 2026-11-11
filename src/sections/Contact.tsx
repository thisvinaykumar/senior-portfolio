import { motion } from "framer-motion";
import { fadeInUp } from "../utils/motion";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { profile } from "../content/profile";
import { contact } from "../content/site";

export default function Contact() {
    return (
        <section id="contact">
            <Container>
                <SectionHeading title={contact.heading} />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mt-4 max-w-2xl"
                >
                    <p className="text-muted">{contact.line}</p>

                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                        <a
                            href={`mailto:${profile.email}`}
                            className="flex items-center gap-3 text-primary hover:underline"
                        >
                            <FaEnvelope />
                            <span>{profile.email}</span>
                        </a>

                        <a
                            href={`tel:${profile.phone}`}
                            className="flex items-center gap-3 text-muted hover:text-primary"
                        >
                            <FaPhone />
                            <span>{profile.phone}</span>
                        </a>

                        <div className="flex gap-4 ml-0 sm:ml-6">
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-primary transition"
                            >
                                <FaGithub size={18} />
                            </a>
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-primary transition"
                            >
                                <FaLinkedin size={18} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
