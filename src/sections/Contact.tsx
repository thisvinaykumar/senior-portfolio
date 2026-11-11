import { ArrowUpRight, FileDown, Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Container from "../components/layout/Container";
import { Reveal } from "../components/motion/Reveal";
import Spotlight from "../components/motion/Spotlight";
import { profile } from "../content/profile";
import { chapters, contact, dock, footer, hero, resumeUrl } from "../content/site";
import { useUi } from "../state/ui";
import { paletteKey } from "../utils/nav";

export default function Contact() {
    const setPaletteOpen = useUi((s) => s.setPaletteOpen);
    return (
        <section id="contact" className="!pb-32">
            <Container>
                <Reveal>
                    <Spotlight className="relative overflow-hidden p-6 sm:p-8 md:p-14">
                        <div
                            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full blur-3xl"
                            style={{ background: "var(--glow)" }}
                            aria-hidden="true"
                        />
                        <p className="eyebrow mb-3">{chapters.contact}</p>
                        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
                            <span className="text-gradient">{contact.heading}</span>
                        </h2>
                        <p className="mt-4 max-w-2xl text-lg text-muted">{contact.line}</p>

                        <a
                            href={`mailto:${profile.email}`}
                            className="group mt-8 inline-flex max-w-full items-center gap-3 text-base font-medium text-ink [overflow-wrap:anywhere] hover:text-accent sm:text-xl md:text-3xl"
                        >
                            <Mail className="hidden shrink-0 text-accent sm:block" size={24} aria-hidden="true" />
                            <span className="min-w-0">{profile.email}</span>
                            <ArrowUpRight className="hidden shrink-0 opacity-0 sm:block transition-opacity group-hover:opacity-100" size={22} aria-hidden="true" />
                        </a>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <a href={`tel:${profile.phone}`} className="btn btn-ghost w-full sm:w-auto">
                                <Phone size={16} aria-hidden="true" />
                                <span>{profile.phone}</span>
                            </a>
                            <a href={resumeUrl} download aria-label={hero.ctaResume.aria} className="btn btn-ghost w-full sm:w-auto">
                                <FileDown size={16} aria-hidden="true" />
                                {hero.ctaResume.label}
                            </a>
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label={footer.socialLabels.linkedin}>
                                <FaLinkedin size={16} aria-hidden="true" />
                            </a>
                            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label={footer.socialLabels.github}>
                                <FaGithub size={16} aria-hidden="true" />
                            </a>
                            <button type="button" onClick={() => setPaletteOpen(true)} aria-label={dock.palette} className="btn btn-ghost hidden sm:inline-flex">
                                <span className="kbd">{paletteKey}</span>
                            </button>
                        </div>
                    </Spotlight>
                </Reveal>
            </Container>
        </section>
    );
}
