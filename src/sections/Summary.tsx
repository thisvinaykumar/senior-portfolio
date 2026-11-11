import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import Container from "../components/layout/Container";

export default function Summary() {
    return (
        <section id="summary">
            <Container>
                <SectionHeading title="Executive Summary" />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-6 max-w-4xl text-muted space-y-4"
                >
                    <p>
                        Senior Software Engineer & System Architect with 5+ years of experience in two worlds: high-scale multi-tenant travel SaaS, and complex distributed systems and ERPs. I deliver end to end — from architecture and data model to production deployment.
                    </p>
                    <p>
                        Works across Node.js, NestJS, Angular, TypeScript, MongoDB, Redis, Docker and AWS EC2, with a deep understanding of system design, microservices, API integration and performance. As Principal System Architect & Product Creator of OpsX (opsx.in), designed edge-first attendance, geofencing, RBAC and automated payroll for Indian SMEs.
                    </p>
                    <p>
                        At EasyRes Travel Technologies (since 2022) I am a full-stack engineer on a multi-tenant B2B/B2C travel marketplace — the top contributor to its Angular consumer and admin portals, with about 3,000 commits across 24 repositories. I built the B2B agent portal, created the travel-insurance and Via.com ferry microservices, and integrated suppliers and payments including 2GO, Barkota, Starlite Ferries, RateHawk, Via Hotels, Jayride and Xendit.
                    </p>
                    <p>
                        I care about money-safe booking flows (atomic wallet claims, automatic reversals, a 138-check offline test harness), financial accuracy (OpsX posts payroll to a double-entry ledger in PostgreSQL), and code reviews — I have merged 480+ pull requests, including teammates' and release branches. I ship faster with AI coding assistants (Claude Code, GitHub Copilot) for boilerplate, test scaffolding and query tuning, while reviewing and testing every change myself.
                    </p>
                    <p>
                        I regularly write about JavaScript, software development, and tips for preparing for MNC interviews. Some of my posts are featured on <a
                            href="https://medium.com/@javaScriptwithvinay"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Medium
                        </a>.
                    </p>
                </motion.div>
            </Container>
        </section>
    );
}
