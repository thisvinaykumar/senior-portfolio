import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Container from "../components/layout/Container";
import DownloadIcon from "../components/ui/icons/DownloadIcon";
import RichText from "../components/ui/RichText";
import { profile } from "../content/profile";
import { hero, resumeUrl } from "../content/site";

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
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">{hero.name}</h1>
                    <p className="mt-4 text-xl text-muted">{hero.tagline}</p>

                    <p className="mt-6 text-muted max-w-2xl">
                        <RichText runs={hero.intro} />
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                        <Button href={hero.ctaContact.href} ariaLabel={hero.ctaContact.aria} className="w-full sm:w-auto py-3 justify-center">
                            {hero.ctaContact.label}
                        </Button>

                        <Button
                            variant="primary"
                            href={resumeUrl}
                            download
                            ariaLabel={hero.ctaResume.aria}
                            className="w-full sm:w-auto py-3 justify-center"
                        >
                            <span className="inline-flex items-center gap-2">
                                <DownloadIcon />
                                <span>{hero.ctaResume.label}</span>
                            </span>
                        </Button>

                        <Button variant="secondary" href={profile.github} target="_blank" ariaLabel={hero.ctaGithub.aria} className="w-full sm:w-auto py-3 justify-center">
                            {hero.ctaGithub.label}
                        </Button>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
