import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Command, Ellipsis, FileDown, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useUi } from "../../state/ui";
import { dock, resumeUrl } from "../../content/site";
import { profile } from "../../content/profile";

const item =
    "flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-colors hover:text-ink hover:bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]";

/** How long the page must sit still before a tucked dock opens again. */
const SETTLE_MS = 1200;

/**
 * Floating quick-action dock. It appears past the hero, tucks into a small pill while the
 * visitor scrolls down (so it never sits on the text being read), and opens again when they
 * scroll up, pause, hover or tab into it.
 */
export default function Dock() {
    const setPaletteOpen = useUi((s) => s.setPaletteOpen);
    const reduce = useReducedMotion();
    const [show, setShow] = useState(false);
    const [tucked, setTucked] = useState(false);
    const [engaged, setEngaged] = useState(false); // pointer over it or focus inside it

    useEffect(() => {
        let lastY = window.scrollY;
        let settle: number | undefined;
        const onScroll = () => {
            const y = window.scrollY;
            setShow(y > window.innerHeight * 0.6);
            if (y > lastY + 2) setTucked(true);
            else if (y < lastY - 2) setTucked(false);
            lastY = y;
            window.clearTimeout(settle);
            settle = window.setTimeout(() => setTucked(false), SETTLE_MS);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.clearTimeout(settle);
        };
    }, []);

    const compact = tucked && !engaged;
    const spring = { type: "spring" as const, stiffness: 420, damping: 34 };

    return (
        <>
            {/* Soft fade at the bottom edge so text scrolls under the dock instead of colliding with it. */}
            <div
                className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-24 transition-opacity duration-300"
                style={{
                    opacity: show ? 1 : 0,
                    background: "linear-gradient(to top, var(--bg) 0%, color-mix(in srgb, var(--bg) 65%, transparent) 45%, transparent 100%)",
                }}
                aria-hidden="true"
            />
            <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center">
                <AnimatePresence>
                    {show && (
                        <motion.nav
                            layout={!reduce}
                            aria-label={dock.label}
                            className="dock pointer-events-auto flex items-center gap-1 rounded-2xl p-1.5"
                            onPointerEnter={() => setEngaged(true)}
                            onPointerLeave={() => setEngaged(false)}
                            onFocus={() => setEngaged(true)}
                            onBlur={(e) => {
                                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setEngaged(false);
                            }}
                            initial={reduce ? false : { opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: compact ? 6 : 0 }}
                            exit={reduce ? undefined : { opacity: 0, y: 24 }}
                            transition={reduce ? { duration: 0 } : spring}
                        >
                            {compact ? (
                                <motion.button
                                    layout={!reduce}
                                    type="button"
                                    onClick={() => setTucked(false)}
                                    className="flex h-7 w-14 items-center justify-center rounded-xl text-muted hover:text-ink"
                                    aria-label={dock.expand}
                                    title={dock.expand}
                                >
                                    <Ellipsis size={18} />
                                </motion.button>
                            ) : (
                                <>
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
                                </>
                            )}
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
