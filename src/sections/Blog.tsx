import { motion } from "framer-motion";
import { fadeInUp } from "../utils/motion";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Container from "../components/layout/Container";
import { blog } from "../content/site";

export default function Blog() {
    return (
        <section id="blog">
            <Container>
                <SectionHeading title={blog.heading} subtitle={blog.subtitle} />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mt-6 max-w-3xl text-muted space-y-4"
                >
                    <p>{blog.intro}</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                        {blog.topics.map((t) => (
                            <li key={t}>{t}</li>
                        ))}
                    </ul>
                    <Button href={blog.cta.href} target="_blank">
                        {blog.cta.label}
                    </Button>
                </motion.div>
            </Container>
        </section>
    );
}
