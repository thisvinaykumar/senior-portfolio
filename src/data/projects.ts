export interface Project {
  title: string;
  role?: string;
  description: string;
  techStack: string[];
  highlights: string[];
  github?: string;
  liveDemo?: string;
}

export const projects: Project[] = [
  {
    title: "OpsX — Industrial ERP & Workforce OS",
    role: "Principal System Architect & Product Creator",
    description:
      "Multi-tenant SaaS ERP for Indian SMEs and plants: attendance, payroll, field staff, factory kiosk, procurement and stock. Designed, built and operated end to end.",
    techStack: ["NestJS", "Node.js", "Angular", "TypeScript", "MongoDB", "PostgreSQL", "Redis", "BullMQ", "React Native", "Docker", "AWS EC2"],
    highlights: [
      "Edge computing: offline-first SQLite queue on Android devices with store-and-forward batch sync, and on-device face verification on kiosk tablets — no image leaves the device.",
      "Geofenced attendance and field tracking: GPS geofences, live map, trips and proof of delivery.",
      "Multi-tenant isolation: a shared or dedicated MongoDB database per tenant (chosen by plan) and a tenant-scope layer that pins every write; hierarchical RBAC entitlements with maker-checker approvals.",
      "Automated payroll: PF, ESI, TDS, professional tax, arrears and full & final settlement, posted to a double-entry general ledger in PostgreSQL through an outbox.",
      "Operations: NestJS API on two instances with rolling restarts, BullMQ workers on Redis and Socket.IO realtime on AWS EC2 behind nginx."
    ],
    github: "https://github.com/thisvinaykumar/opsx-erp",
    liveDemo: "https://opsx.in/"
  },
  {
    title: "Multi-Tenant B2B/B2C Travel Marketplace (EasyRes)",
    role: "Full Stack Engineer — private company platform",
    description:
      "A travel SaaS where subscribers run their own agencies and agents: flights, hotels, ferries, holiday packages, tours, visa, insurance and airport transfers, with white-label consumer portals for client brands.",
    techStack: ["Angular 14", "Node.js", "Express", "MongoDB", "Mongoose", "AWS S3/SES", "node-cron", "REST & SOAP APIs"],
    highlights: [
      "20+ Node.js microservices, one per product, behind a gateway; supplier integrations including Travelport and Sabre GDS, the Atlas LCC aggregator, RateHawk, GRN Connect, Dida, Bedsonline, Via Hotels, 2GO, Barkota, Starlite Ferries, Via.com ferries, Jayride, Xendit and PayMongo; in-house packages, tours and visa.",
      "Booking lifecycle: search, pricing, seat block/hold, wallet or gateway payment, ticketing, polling, cancellation, refunds and PDF vouchers.",
      "Wallet safety: atomic claims, automatic reversal on failed supplier bookings and a manual-review path — backed by a 138-check offline test harness.",
      "Multi-level pricing: subscriber grade codes plus agency markups and discounts per product."
    ],
    liveDemo: "https://www.easyres.in/"
  },
  {
    title: "Gateway-free UPI Collection (OpsX module)",
    role: "Designed and built · pre-launch",
    description:
      "Lets a business collect payments straight into its own bank account through a UPI QR code, without a payment gateway's per-transaction fee, for OpsX invoices and gym membership fees.",
    techStack: ["NestJS", "MongoDB", "Angular", "TypeScript", "UPI deep links / QR", "xlsx"],
    highlights: [
      "Trust model: the payer's UTR (UPI transaction reference) is treated as a claim, never as proof. Every confirmation path goes through one compare-and-set approval (claimed → approved) that reverts on failure.",
      "Each UTR counts once: a unique partial index on {tenant, UTR}; rejecting or voiding a payment releases the UTR instead of deleting the evidence.",
      "Bank-statement reconciliation: upload a statement (HDFC, SBI, Kotak, Axis formats), see a dry run first, then approve every matched claim in one step (matching by amount and day in IST), get one-to-one match suggestions for unclaimed credits, and see contradictions flagged (e.g. one bank credit named by two claims) instead of silently rejecting them.",
      "Reproduced a double-approval race with failing tests before fixing it (claim-first findOneAndUpdate, 409 when the payment changed underneath).",
      "Scoped deliberately: no scraping of payment apps and no OTP-linking of merchant accounts, for terms-of-service and payment-aggregator licensing reasons. Next steps: a gateway adapter and bank-alert parsing."
    ]
  },
  {
    title: "Clinic Queue — Real-time Token & Queue SaaS",
    description:
      "Clinic check-in, live token queue, prescriptions and patient alerts, with a super-admin panel and an Android app.",
    techStack: ["Express 5", "TypeScript", "PostgreSQL", "Socket.IO", "React 19", "Capacitor"],
    highlights: [
      "Transactional outbox on Postgres (LISTEN/NOTIFY + SKIP LOCKED workers) drives WhatsApp/SMS alerts with expiry, state re-check and SMS fallback.",
      "Live queue over Socket.IO; deploy kit with systemd, nginx and rollback. Built and deploy-ready."
    ]
  },
  {
    title: "SafeStep — Personal Safety App",
    description:
      "SOS, live location sharing with trusted contacts, a Safe Walk timer and family pairing.",
    techStack: ["NestJS", "MongoDB", "BullMQ", "Redis", "Socket.IO", "Expo (React Native)"],
    highlights: [
      "The server escalates automatically when a timed check-in is missed, using BullMQ delayed jobs.",
      "Live location over Socket.IO; 27 integration tests in CI. Working prototype."
    ]
  },
  {
    title: "Content Automation Platform — Video, Podcast & Social Publishing",
    role: "Personal · runs daily as scheduled jobs",
    description:
      "A set of scheduled pipelines that turn one piece of content into YouTube videos, a podcast feed and posts on Instagram, Facebook, LinkedIn and X, built to survive restarts, quotas and duplicate runs.",
    techStack: ["Python", "FFmpeg", "Node.js", "YouTube Data API", "Meta Graph API", "LinkedIn API", "X API (OAuth 1.0a)", "Cloudflare R2"],
    highlights: [
      "Resumable multi-stage pipeline (script, voice, images, render, scheduled upload): each stage checkpoints to disk, so a closed laptop or a quota error resumes where it stopped instead of starting over.",
      "No duplicate uploads: a shared schedule ledger written by three jobs, guarded by an O_EXCL lockfile with stale-lock breaking, plus a channel-ID check before every upload. Resumable 8 MB chunked uploads with YouTube's publishAt scheduling.",
      "Idempotent fan-out to four social platforms from RSS, sitemap and video sources: a dedup ledger keyed platform:brand:source:id with atomic temp-file-and-rename writes, a 'baseline on first sight' rule that prevents a backfill flood, and a dry-run mode.",
      "Platform specifics handled in code: Meta Reels resumable upload with container-status polling, X OAuth 1.0a signed by hand, LinkedIn as organisation or member, and a self-hosted podcast RSS on Cloudflare R2 (Spotify has no upload API).",
      "65 automated tests across the two pipelines."
    ]
  },
  {
    title: "Shubhsaathi Foundation — NGO Website",
    description:
      "Pro-bono website for an NGO in 14 Indian languages (including English and Hindi), with light and dark themes.",
    techStack: ["Next.js 14", "Tailwind", "Framer Motion"],
    highlights: [
      "Static export, live in production."
    ],
    liveDemo: "https://shubhsaathi.org/"
  }
];
