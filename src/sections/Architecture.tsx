import { motion } from "framer-motion";
import { fadeInUp } from "../utils/motion";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";

export default function Architecture() {
    return (
        <section id="architecture">
            <Container>
                <SectionHeading title="System Design & Architecture" />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mt-6 max-w-4xl text-muted space-y-4"
                >
                    <p>
                        <span className="text-white font-semibold">OpsX (opsx.in)</span> — as Principal System Architect &amp; Product Creator:
                        edge-first attendance (offline SQLite queue with batch sync, on-device face verification),
                        geofenced attendance and field tracking, a database per tenant with hierarchical RBAC and
                        maker-checker approvals, and automated payroll (PF, ESI, TDS) posted to a double-entry ledger.
                        NestJS, BullMQ on Redis and Socket.IO, running on AWS EC2.
                    </p>
                    <p>
                        Designed and implemented multi-tenant SaaS architecture with strict
                        RBAC separating master admin, subscriber admin, agencies, and
                        consumers.
                    </p>
                    <p>
                        Built pricing markup engines and wallet systems ensuring financial
                        accuracy, auditability, and scalability across B2B & B2C workflows.
                    </p>
                    <p>
                        Owned API design, frontend architecture, and performance optimization
                        (~30% improvement).
                    </p>
                </motion.div>
            </Container>
        </section>
    );
}
