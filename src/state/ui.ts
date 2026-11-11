import { create } from "zustand";

export type Theme = "dark" | "light";

function initialTheme(): Theme {
    if (typeof window === "undefined") return "dark";
    try {
        const saved = localStorage.getItem("theme");
        if (saved === "dark" || saved === "light") return saved;
    } catch {
        /* storage blocked (private mode) — fall back to the OS setting */
    }
    return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: Theme) {
    document.documentElement.classList.toggle("light", theme === "light");
    try {
        localStorage.setItem("theme", theme);
    } catch {
        /* storage blocked — theme still applies for this visit */
    }
}

interface UiState {
    theme: Theme;
    toggleTheme: () => void;
    paletteOpen: boolean;
    setPaletteOpen: (open: boolean) => void;
}

const startTheme = initialTheme();
if (typeof document !== "undefined") applyTheme(startTheme);

export const useUi = create<UiState>((set, get) => ({
    theme: startTheme,
    toggleTheme: () => {
        const next: Theme = get().theme === "dark" ? "light" : "dark";
        applyTheme(next);
        set({ theme: next });
    },
    paletteOpen: false,
    setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
}));
