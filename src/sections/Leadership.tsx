import { motion } from "framer-motion";
import { fadeInUp } from "../utils/motion";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { leadership } from "../content/site";

export default function Leadership() {
    return (
        <section id="leadership">
            <Container>
                <SectionHeading title={leadership.heading} />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mt-6 max-w-4xl text-muted space-y-4"
                >
                    {leadership.paragraphs.map((p) => (
                        <p key={p}>{p}</p>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
