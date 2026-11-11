import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import clsx from "clsx";
import { nav } from "../../content/site";
import { useUi } from "../../state/ui";
import { paletteKey, scrollToId } from "../../utils/nav";

const navItems = nav.items;

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("hero");
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme, setPaletteOpen } = useUi();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

    // Highlight the section currently in view.
    useEffect(() => {
        const sections = navItems.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
        );
        sections.forEach((s) => io.observe(s));
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            io.disconnect();
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const go = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(false);
        scrollToId(id);
    };

    return (
        <header
            className={clsx(
                "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
                scrolled || open ? "border-b border-line bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-xl" : "border-b border-transparent",
            )}
        >
            <nav className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-5 md:px-8">
                <a href="#hero" onClick={go("hero")} className="flex shrink-0 items-center gap-2 whitespace-nowrap text-lg font-semibold tracking-tight text-ink">
                    <span className="grid h-7 w-7 place-items-center rounded-lg border border-line-strong font-mono text-xs text-accent" aria-hidden="true">
                        vk
                    </span>
                    <span>{nav.brand}</span>
                </a>

                {/* Desktop links */}
                <ul className="hidden min-w-0 items-center gap-0.5 whitespace-nowrap xl:flex">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                onClick={go(item.id)}
                                aria-current={active === item.id ? "location" : undefined}
                                className={clsx(
                                    "rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                                    active === item.id ? "text-ink bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]" : "text-muted hover:text-ink",
                                )}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex shrink-0 items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setPaletteOpen(true)}
                        className="hidden items-center gap-2 whitespace-nowrap rounded-xl border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-ink sm:flex"
                    >
                        <Search size={15} aria-hidden="true" />
                        <span>{nav.search}</span>
                        <span className="kbd">{paletteKey}</span>
                    </button>
                    <button
                        type="button"
                        aria-label={nav.toggleTheme}
                        onClick={toggleTheme}
                        className="grid h-9 w-9 place-items-center rounded-xl border border-line text-muted transition-colors hover:text-ink"
                    >
                        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button
                        type="button"
                        aria-label={nav.toggleMenu}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        onClick={() => setOpen(!open)}
                        className="grid h-9 w-9 place-items-center rounded-xl border border-line text-muted xl:hidden"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </nav>

            <motion.div className="h-px origin-left bg-accent" style={{ scaleX: progress }} aria-hidden="true" />

            {/* Mobile / tablet menu (always rendered so its links stay in the page) */}
            <div
                id="mobile-menu"
                className={clsx(
                    "absolute inset-x-0 top-16 border-b border-line bg-[var(--bg)] px-5 pb-6 pt-2 transition-all duration-300 ease-out xl:hidden",
                    open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0",
                )}
                aria-hidden={!open}
            >
                <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                onClick={go(item.id)}
                                tabIndex={open ? 0 : -1}
                                className={clsx(
                                    "block rounded-lg px-3 py-2.5 text-[0.95rem]",
                                    active === item.id ? "text-ink bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]" : "text-muted",
                                )}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 flex gap-2">
                    <button
                        type="button"
                        tabIndex={open ? 0 : -1}
                        onClick={toggleTheme}
                        className="btn btn-ghost flex-1 py-2.5"
                    >
                        {theme === "dark" ? nav.lightMode : nav.darkMode}
                    </button>
                    <button
                        type="button"
                        tabIndex={open ? 0 : -1}
                        onClick={() => {
                            setOpen(false);
                            setPaletteOpen(true);
                        }}
                        className="btn btn-ghost flex-1 py-2.5"
                    >
                        <Search size={15} aria-hidden="true" /> {nav.search}
                    </button>
                </div>
            </div>
        </header>
    );
}
