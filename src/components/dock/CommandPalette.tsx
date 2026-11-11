import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Copy, ExternalLink, FileDown, Mail, Moon, Phone, Search, Sun } from "lucide-react";
import { useUi } from "../../state/ui";
import { nav, palette, resumeUrl } from "../../content/site";
import { profile } from "../../content/profile";
import { scrollToId } from "../../utils/nav";

interface Command {
    id: string;
    group: keyof typeof palette.groups;
    label: string;
    hint?: string;
    keywords?: string;
    icon: ReactNode;
    run: () => void;
}


function buildCommands(close: () => void, notify: (msg: string) => void, themeIcon: ReactNode, toggleTheme: () => void): Command[] {
    const go = (id: string) => () => {
        close();
        requestAnimationFrame(() => scrollToId(id));
    };
    return [
        ...nav.items.map((item) => ({
            id: `go-${item.id}`,
            group: "navigate" as const,
            label: `${palette.goTo} ${item.label}`,
            keywords: item.id,
            icon: <ArrowRight size={16} />,
            run: go(item.id),
        })),
        {
            id: "resume",
            group: "actions",
            label: palette.downloadResume,
            keywords: "cv pdf download",
            icon: <FileDown size={16} />,
            run: () => {
                close();
                const a = document.createElement("a");
                a.href = resumeUrl;
                a.download = "";
                a.click();
            },
        },
        {
            id: "email",
            group: "actions",
            label: palette.emailMe,
            hint: profile.email,
            keywords: "mail contact hire",
            icon: <Mail size={16} />,
            run: () => {
                close();
                window.location.href = `mailto:${profile.email}`;
            },
        },
        {
            id: "copy-email",
            group: "actions",
            label: palette.copyEmail,
            keywords: "clipboard",
            icon: <Copy size={16} />,
            run: () => {
                close();
                navigator.clipboard?.writeText(profile.email).then(
                    () => notify(palette.copied),
                    () => notify(profile.email),
                );
            },
        },
        {
            id: "call",
            group: "actions",
            label: palette.call,
            hint: profile.phone,
            keywords: "phone",
            icon: <Phone size={16} />,
            run: () => {
                close();
                window.location.href = `tel:${profile.phone}`;
            },
        },
        {
            id: "theme",
            group: "actions",
            label: palette.toggleTheme,
            keywords: "dark light mode",
            icon: themeIcon,
            run: toggleTheme,
        },
        ...profile.socialLinks
            .filter((l) => !l.url.startsWith("mailto:"))
            .map((l) => ({
                id: `link-${l.url}`,
                group: "profiles" as const,
                label: l.platform,
                hint: l.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
                icon: <ExternalLink size={16} />,
                run: () => {
                    close();
                    window.open(l.url, "_blank", "noopener,noreferrer");
                },
            })),
    ];
}

/** The dialog itself; mounted only while open, so its search state starts fresh every time. */
function PaletteDialog({ notify }: { notify: (msg: string) => void }) {
    const { setPaletteOpen, theme, toggleTheme } = useUi();
    const reduce = useReducedMotion();
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const close = () => setPaletteOpen(false);
    const commands = buildCommands(close, notify, theme === "dark" ? <Sun size={16} /> : <Moon size={16} />, toggleTheme);
    const q = query.trim().toLowerCase();
    const results = q ? commands.filter((c) => `${c.label} ${c.hint ?? ""} ${c.keywords ?? ""}`.toLowerCase().includes(q)) : commands;

    useEffect(() => {
        const previous = document.activeElement as HTMLElement | null;
        document.body.style.overflow = "hidden";
        inputRef.current?.focus();
        return () => {
            document.body.style.overflow = "";
            previous?.focus?.();
        };
    }, []);

    const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => (results.length ? (i + 1) % results.length : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            results[active]?.run();
        } else if (e.key === "Escape") {
            e.preventDefault();
            close();
        } else if (e.key === "Tab") {
            e.preventDefault(); // focus stays in the dialog
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.15 }}
        >
            <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={close} aria-hidden="true" />
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={palette.title}
                className="glass relative w-full max-w-xl overflow-hidden"
                style={{ background: "var(--surface-solid)" }}
                initial={reduce ? false : { opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="flex items-center gap-3 border-b border-line px-4">
                    <Search size={18} className="shrink-0 text-muted" aria-hidden="true" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setActive(0);
                        }}
                        onKeyDown={onInputKey}
                        placeholder={palette.placeholder}
                        className="h-14 w-full bg-transparent text-[0.95rem] text-ink placeholder:text-faint focus:outline-none"
                        role="combobox"
                        aria-expanded="true"
                        aria-controls="cmdk-list"
                        aria-activedescendant={results[active] ? `cmdk-${results[active].id}` : undefined}
                        aria-autocomplete="list"
                    />
                    <button type="button" onClick={close} className="kbd" aria-label={palette.hints.close}>
                        Esc
                    </button>
                </div>

                <ul id="cmdk-list" role="listbox" aria-label={palette.title} className="max-h-[52vh] overflow-y-auto p-2">
                    {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">{palette.empty}</li>}
                    {results.map((c, i) => {
                        const header = i === 0 || results[i - 1].group !== c.group ? palette.groups[c.group] : null;
                        const on = i === active;
                        return (
                            <li key={c.id} role="presentation">
                                {header && (
                                    <div className="px-3 pb-1 pt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint" aria-hidden="true">
                                        {header}
                                    </div>
                                )}
                                <div
                                    id={`cmdk-${c.id}`}
                                    role="option"
                                    aria-selected={on}
                                    onMouseMove={() => setActive(i)}
                                    onClick={() => c.run()}
                                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                                        on ? "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-ink" : "text-muted"
                                    }`}
                                >
                                    <span className={on ? "text-accent" : "text-faint"}>{c.icon}</span>
                                    <span className="flex-1 truncate">{c.label}</span>
                                    {c.hint && <span className="hidden max-w-[45%] truncate font-mono text-xs text-faint sm:block">{c.hint}</span>}
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-xs text-faint">
                    <span className="flex items-center gap-1.5">
                        <span className="kbd">↑</span>
                        <span className="kbd">↓</span> {palette.hints.navigate}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="kbd">↵</span> {palette.hints.open}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="kbd">Esc</span> {palette.hints.close}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function CommandPalette() {
    const open = useUi((s) => s.paletteOpen);
    const setPaletteOpen = useUi((s) => s.setPaletteOpen);
    const [toast, setToast] = useState<string | null>(null);

    // Global shortcuts: Cmd/Ctrl+K toggles, "/" opens.
    useEffect(() => {
        const onKey = (e: globalThis.KeyboardEvent) => {
            const typing = /INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement)?.tagName ?? "");
            const isOpen = useUi.getState().paletteOpen;
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setPaletteOpen(!isOpen);
            } else if (e.key === "/" && !typing && !isOpen) {
                e.preventDefault();
                setPaletteOpen(true);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [setPaletteOpen]);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 1800);
        return () => clearTimeout(t);
    }, [toast]);

    return (
        <>
            <AnimatePresence>{open && <PaletteDialog notify={setToast} />}</AnimatePresence>
            <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[110] flex justify-center">
                {toast && <div className="glass px-4 py-2 text-sm text-ink">{toast}</div>}
            </div>
        </>
    );
}
