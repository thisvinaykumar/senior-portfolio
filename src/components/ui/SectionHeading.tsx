import { Reveal } from "../motion/Reveal";

/** Chapter heading: mono eyebrow, large title, optional subtitle. */
export default function SectionHeading({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
    return (
        <Reveal className="mb-10 md:mb-14">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
            {subtitle && <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">{subtitle}</p>}
        </Reveal>
    );
}
