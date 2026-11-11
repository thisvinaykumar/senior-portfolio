import type { Paragraph } from "../../content/site";

/** Renders one rich-text paragraph from src/content (plain runs, links, emphasis). */
export default function RichText({ runs }: { runs: Paragraph }) {
    return (
        <>
            {runs.map((run, i) => {
                if (typeof run === "string") return <span key={i}>{run}</span>;
                if ("href" in run) {
                    const external = /^https?:/.test(run.href);
                    return (
                        <a
                            key={i}
                            href={run.href}
                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="text-primary hover:underline"
                        >
                            {run.text}
                        </a>
                    );
                }
                return (
                    <span key={i} className="text-white font-semibold">
                        {run.text}
                    </span>
                );
            })}
        </>
    );
}
