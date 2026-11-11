import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const fmt = new Intl.NumberFormat("en-US");

/** Counts up to `value` once, when it first scrolls into view. Final text is what screen readers get. */
export default function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const reduce = useReducedMotion();
    const [shown, setShown] = useState(reduce ? value : 0);

    useEffect(() => {
        if (!inView || reduce) return;
        const controls = animate(0, value, {
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setShown(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, reduce, value]);

    const finalText = `${prefix}${fmt.format(value)}${suffix}`;
    return (
        <span ref={ref} aria-label={finalText}>
            <span aria-hidden="true">
                {prefix}
                {fmt.format(reduce ? value : shown)}
                {suffix}
            </span>
        </span>
    );
}
