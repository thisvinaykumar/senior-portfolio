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
                        Senior Software Engineer & System Architect with 5+ years of experience building scalable, multi-tenant SaaS and ERP platforms for B2B and B2C domains. Proven track record of delivering end-to-end solutions from architecture design to production deployment.
                    </p>
                    <p>
                        Works across Node.js, NestJS, Angular, TypeScript, MongoDB, Redis, Docker and AWS EC2, with a deep understanding of system design, microservices, API integration and performance. As Principal System Architect & Product Creator of OpsX (opsx.in), designed edge-first attendance, geofencing, RBAC and automated payroll for Indian SMEs.
                    </p>
                    <p>
                        Passionate about mentoring teams, leading code reviews, and driving engineering best practices. Strong focus on delivering business impact and improving system efficiency by applying thoughtful design and technical ownership.
                    </p>
                    <p>
                        Excels at bridging product and engineering, ensuring features are robust, scalable, and maintainable. Experienced in building complex workflows like wallet systems, pricing engines, RBAC hierarchies, and multi-tenant admin portals.
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
