import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import Container from "../components/layout/Container";
import RichText from "../components/ui/RichText";
import { summary } from "../content/site";

export default function Summary() {
    return (
        <section id="summary">
            <Container>
                <SectionHeading title={summary.heading} />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-6 max-w-4xl text-muted space-y-4"
                >
                    {summary.paragraphs.map((p, i) => (
                        <p key={i}>
                            <RichText runs={p} />
                        </p>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
