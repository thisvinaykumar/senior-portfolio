import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Container from "../components/layout/Container";
import DownloadIcon from "../components/ui/icons/DownloadIcon";
import { profile } from "../data/profile";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center" id="hero">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl"
                >
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                        Vinay Kumar
                    </h1>
                    <p className="mt-4 text-xl text-muted">
                        Senior Full Stack Engineer · SaaS · B2B/B2C · System Ownership
                    </p>

                    <p className="mt-6 text-muted max-w-2xl">
                        5+ years building large-scale multi-tenant SaaS platforms with
                        ownership from architecture to production.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                        <Button href="#contact" ariaLabel="Contact me" className="w-full sm:w-auto py-3 justify-center">Contact</Button>

                        <Button
                            variant="primary"
                            href="/assets/Vinay_Kumar_Senior_Full_Stack_Engineer_5Yrs_.pdf"
                            download
                            ariaLabel="Download Vinay Kumar resume PDF"
                            className="w-full sm:w-auto py-3 justify-center"
                        >
                            <span className="inline-flex items-center gap-2">
                                <DownloadIcon />
                                <span>Download Resume</span>
                            </span>
                        </Button>

                        <Button variant="secondary" href={profile.github} target="_blank" ariaLabel="Open GitHub in new tab" className="w-full sm:w-auto py-3 justify-center">
                            GitHub
                        </Button>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
