import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaFacebook, FaGithub, FaGlobe, FaHandHoldingHeart, FaInstagram, FaLinkedin, FaMedium, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { fadeInUp, staggerContainer } from "../utils/motion";
import { ecosystemSection } from "../content/site";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { ecosystem, type EcoIcon } from "../content/ecosystem";

const ICONS: Record<EcoIcon, IconType> = {
    linkedin: FaLinkedin,
    github: FaGithub,
    x: FaXTwitter,
    instagram: FaInstagram,
    facebook: FaFacebook,
    medium: FaMedium,
    youtube: FaYoutube,
    web: FaGlobe,
    ngo: FaHandHoldingHeart,
};

export default function Ecosystem() {
    return (
        <section id="ecosystem">
            <Container>
                <SectionHeading title={ecosystemSection.heading} />
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {ecosystem.map((group) => (
                        <motion.div
                            key={group.title}
                            variants={fadeInUp}
                            className="bg-card p-6 rounded-xl border border-slate-700 hover:border-primary transition"
                        >
                            <h3 className="text-xl font-semibold">{group.title}</h3>
                            <p className="mt-2 text-muted text-sm">{group.blurb}</p>
                            <ul className="mt-4 space-y-2">
                                {group.links.map((link) => {
                                    const Icon = ICONS[link.icon];
                                    return (
                                        <li key={link.url}>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="me noopener noreferrer"
                                                className="flex items-center gap-3 text-muted hover:text-primary transition"
                                            >
                                                <Icon size={18} aria-hidden="true" />
                                                <span>{link.label}</span>
                                                <span className="ml-auto text-xs opacity-70">{link.handle}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
