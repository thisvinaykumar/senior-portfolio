import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Command, FileDown, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useUi } from "../../state/ui";
import { dock, resumeUrl } from "../../content/site";
import { profile } from "../../content/profile";

const item =
    "flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-colors hover:text-ink hover:bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]";

/** Floating quick-action dock; slides in once the visitor scrolls past the hero. */
export default function Dock() {
    const setPaletteOpen = useUi((s) => s.setPaletteOpen);
    const reduce = useReducedMotion();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center">
        <AnimatePresence>
            {show && (
                <motion.nav
                    aria-label={dock.label}
                    className="glass pointer-events-auto flex items-center gap-1 p-1.5"
                    style={{ background: "var(--surface-solid)" }}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    <a href={resumeUrl} download className={item} aria-label={dock.resume} title={dock.resume}>
                        <FileDown size={19} />
                    </a>
                    <a href={`mailto:${profile.email}`} className={item} aria-label={dock.email} title={dock.email}>
                        <Mail size={19} />
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={item} aria-label={dock.linkedin} title={dock.linkedin}>
                        <FaLinkedin size={18} />
                    </a>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className={item} aria-label={dock.github} title={dock.github}>
                        <FaGithub size={18} />
                    </a>
                    <span className="mx-1 h-6 w-px bg-[var(--border-strong)]" aria-hidden="true" />
                    <button type="button" onClick={() => setPaletteOpen(true)} className={item} aria-label={dock.palette} title={dock.palette}>
                        <Command size={18} />
                    </button>
                </motion.nav>
            )}
        </AnimatePresence>
        </div>
    );
}
