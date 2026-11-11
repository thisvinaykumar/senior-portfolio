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
                        geofenced attendance and field tracking, a shared or dedicated database per tenant (by plan) with hierarchical RBAC and
                        maker-checker approvals, and automated payroll (PF, ESI, TDS) posted to a double-entry ledger.
                        NestJS, BullMQ on Redis and Socket.IO, running on AWS EC2.
                    </p>
                    <p>
                        EasyRes travel marketplace — 20+ Node.js microservices, one per product, on a
                        subscriber → agency → agent multi-tenant model. Designed the Via.com ferry service
                        (search → seat block → payment → book → resumable status polling) and created the
                        travel-insurance service.
                    </p>
                    <p>
                        Money-safe booking: atomic claims before every wallet or supplier side effect,
                        automatic wallet reversal on failed bookings and a manual-review path for unknown
                        outcomes — proven by a 138-check offline test harness. Multi-level pricing with
                        subscriber grade codes and agency markups.
                    </p>
                    <p>
                        Owned frontend architecture for the Angular consumer and admin portals: the B2B agent
                        portal built from scratch, and a per-product SCSS theming system for white-label tenant
                        portals.
                    </p>
                </motion.div>
            </Container>
        </section>
    );
}
