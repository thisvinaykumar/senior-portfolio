import { useState, useEffect } from "react";
import { Link } from "react-scroll"; // smooth scroll
import { HiMenu, HiX } from "react-icons/hi";
import { FaSun, FaMoon } from "react-icons/fa";
import clsx from "clsx";

const navItems = [
    { label: "Home", id: "hero" },
    { label: "Summary", id: "summary" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Architecture", id: "architecture" },
    { label: "Leadership", id: "leadership" },
    { label: "Blog", id: "blog" },
    { label: "Ecosystem", id: "ecosystem" },
    { label: "Contact", id: "contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const getInitialTheme = () => {
        if (typeof window === 'undefined') return 'dark';
        const s = localStorage.getItem('theme') as 'dark' | 'light' | null;
        if (s) return s;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };
    const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'light') root.classList.add('light');
        else root.classList.remove('light');
        try { localStorage.setItem('theme', theme); } catch {   }
    }, [theme]);

    return (
        <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 md:px-16 flex justify-between items-center h-16">
                <div className="text-2xl font-bold text-primary">Vinay Kumar</div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <ul className="flex gap-8 text-header font-medium">
                        {navItems.map((item) => (
                            <li key={item.id} className="hover:text-primary transition">
                                <Link
                                    to={item.id}
                                    smooth
                                    duration={500}
                                    offset={-80} // adjust for navbar height
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Theme toggle (desktop) */}
                    <button
                        aria-label="Toggle theme"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="text-header ml-2 focus:outline-none"
                    >
                        {theme === 'dark' ? <FaSun /> : <FaMoon />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        aria-label="Toggle theme"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="text-header mr-3 focus:outline-none"
                    >
                        {theme === 'dark' ? <FaSun /> : <FaMoon />}
                    </button>

                    <button
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                        className="text-header focus:outline-none"
                    >
                        {open ? <HiX size={28} /> : <HiMenu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <ul
                className={clsx(
                    "md:hidden flex flex-col gap-6 bg-background/95 backdrop-blur-md absolute w-full px-6 py-8 transition-all duration-300 ease-out",
                    open ? "top-16 opacity-100 pointer-events-auto translate-y-0" : "top-16 opacity-0 pointer-events-none -translate-y-4"
                )}
            >
                {navItems.map((item) => (
                    <li key={item.id} className="text-header font-medium text-lg">
                        <Link
                            to={item.id}
                            smooth
                            duration={500}
                            offset={-80}
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}

                <li className="pt-2">
                    <button
                        aria-label="Toggle theme"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="text-slate-300 font-medium text-lg"
                    >
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </li>
            </ul>
        </nav>
    );
}
