import type { PointerEvent, ReactNode } from "react";
import clsx from "clsx";

/** A glass card whose border and background light up around the pointer. */
export default function Spotlight({
    children,
    className,
    as: Tag = "div",
}: {
    children: ReactNode;
    className?: string;
    as?: "div" | "article" | "li";
}) {
    const onMove = (e: PointerEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    return (
        <Tag onPointerMove={onMove} className={clsx("glass spotlight", className)}>
            {children}
        </Tag>
    );
}
