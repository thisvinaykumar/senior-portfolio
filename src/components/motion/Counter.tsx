import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const fmt = new Intl.NumberFormat("en-US");

/**
 * Counts up to `value` once, when it first scrolls into view. Final text is what screen readers get.
 * Each frame writes the digits straight to the DOM — no React state, so no re-render per frame.
 */
export default function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const digits = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const reduce = useReducedMotion();
    const text = (n: number) => `${prefix}${fmt.format(n)}${suffix}`;

    useEffect(() => {
        if (!inView || reduce) return;
        const controls = animate(0, value, {
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => {
                if (digits.current) digits.current.textContent = `${prefix}${fmt.format(Math.round(v))}${suffix}`;
            },
        });
        return () => controls.stop();
    }, [inView, reduce, value, prefix, suffix]);

    return (
        <span ref={ref} aria-label={text(value)}>
            <span ref={digits} aria-hidden="true">
                {text(reduce ? value : 0)}
            </span>
        </span>
    );
}
