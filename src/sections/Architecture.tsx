import { motion } from "framer-motion";
import { fadeInUp } from "../utils/motion";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import RichText from "../components/ui/RichText";
import { architecture } from "../content/site";

export default function Architecture() {
    return (
        <section id="architecture">
            <Container>
                <SectionHeading title={architecture.heading} />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mt-6 max-w-4xl text-muted space-y-4"
                >
                    {architecture.paragraphs.map((p, i) => (
                        <p key={i}>
                            <RichText runs={p} />
                        </p>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
