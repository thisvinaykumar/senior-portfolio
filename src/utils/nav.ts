const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

/** How the command-palette shortcut is shown on this device. */
export const paletteKey = isMac ? "⌘K" : "Ctrl K";

/** Scroll to a section by id (smooth unless the visitor prefers reduced motion). */
export function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
}
