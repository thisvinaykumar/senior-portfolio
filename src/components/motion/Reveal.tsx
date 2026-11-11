import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
    children,
    delay = 0,
    y = 22,
    className,
    as = "div",
}: {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
    as?: "div" | "li" | "article" | "p";
}) {
    const reduce = useReducedMotion();
    const Tag = motion[as];
    if (reduce) return <Tag className={className}>{children}</Tag>;
    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay, ease: EASE }}
        >
            {children}
        </Tag>
    );
}
