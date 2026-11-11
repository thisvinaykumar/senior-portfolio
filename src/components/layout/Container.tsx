import type { ReactNode } from "react";
import clsx from "clsx";

export default function Container({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={clsx("mx-auto w-full max-w-page px-5 md:px-8", className)}>{children}</div>;
}
