import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and lifts its children into place the first time they come near the viewport.
 * It starts while the element is still 20% of a screen below the fold, so content is
 * already there when it scrolls in, even on a fast flick.
 */
export function Reveal({
    children,
    delay = 0,
    y = 16,
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
            viewport={{ once: true, amount: 0, margin: "0px 0px 20% 0px" }}
            transition={{ duration: 0.4, delay, ease: EASE }}
        >
            {children}
        </Tag>
    );
}
