import type { IconType } from "react-icons";
import { FaFacebook, FaGithub, FaGlobe, FaHandHoldingHeart, FaInstagram, FaLinkedin, FaMedium, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Spotlight from "../components/motion/Spotlight";
import { Reveal } from "../components/motion/Reveal";
import { ecosystem, type EcoIcon } from "../content/ecosystem";
import { chapters, ecosystemSection } from "../content/site";

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
                <SectionHeading title={ecosystemSection.heading} eyebrow={chapters.ecosystem} />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {ecosystem.map((group, i) => (
                        <Reveal key={group.title} delay={(i % 3) * 0.06}>
                            <Spotlight className="h-full p-6">
                                <h3 className="text-lg font-semibold">{group.title}</h3>
                                <p className="mt-1.5 text-sm text-muted">{group.blurb}</p>
                                <ul className="mt-5 space-y-1">
                                    {group.links.map((link) => {
                                        const Icon = ICONS[link.icon];
                                        return (
                                            <li key={link.url}>
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="me noopener noreferrer"
                                                    className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2 text-muted transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] hover:text-ink"
                                                >
                                                    <Icon size={17} aria-hidden="true" />
                                                    <span>{link.label}</span>
                                                    <span className="ml-auto truncate font-mono text-xs text-faint">{link.handle}</span>
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Spotlight>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}
