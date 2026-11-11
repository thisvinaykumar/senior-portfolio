export interface Experience {
  company: string;
  title: string;
  duration: string;
  points: string[];
}

// Every EasyRes claim below is backed by git history in D:\Office (reviewed 2026-11-10).
// Client / tenant brand names are deliberately left out; public supplier names are fine.
export const experience: Experience[] = [
  {
    company: "EasyRes Travel Technologies Pvt. Ltd., Delhi",
    title: "Software Development Engineer II (Full Stack)",
    duration: "Jul 2024 – Present",
    points: [
      "Full-stack engineer on a multi-tenant B2B/B2C travel marketplace with a subscriber, agency and agent hierarchy, built as 20+ Node.js microservices, one per product; ~3,000 commits across 24 repositories since 2022.",
      "Platform integrations: flights via Travelport and Sabre GDS and the Atlas LCC aggregator, searched in parallel; hotels via RateHawk, GRN Connect, Dida, Bedsonline and Via Hotels; ferries via 2GO, Barkota, Starlite Ferries and Via; airport transfers via Jayride; payments via Xendit and PayMongo; plus in-house holiday packages, tours and visa with no third-party supplier.",
      "Client-facing ownership: work directly with client stakeholders to gather requirements, plan features and design technical solutions for ferries, hotels, visa, holiday packages, airport shuttles and payments (Xendit, PayMongo), then own delivery end to end.",
      "Round trips on one-way supplier APIs: Barkota and 2GO offer no native round-trip booking, so I designed round trips on top of their single-journey APIs — outbound and return searched separately and priced together, one gateway or wallet payment covering both legs, two supplier reservations tracked leg by leg. 2GO has no cancel, void or release endpoint, so the design validates both legs fully before any seat is held, books each leg while persisting state, and records unreleasable holds for follow-up.",
      "Ferries (2GO, Barkota, Starlite, Via): full supplier integration plus client-specific rules — built the Via.com ferry service from scratch (search, seat block, payment, booking, restart-safe status polling); 2GO's new B2C API with restricted fares (senior, PWD, student, minor) and per-agency round-trip permissions; the whole B2B channel for Barkota; Starlite refunds, voids, ticketing and Xendit notifications.",
      "Designed money-safe booking flows that prevent double charges: atomic claims before every wallet or supplier side effect, automatic wallet reversal on failed bookings and a manual-review queue for unknown outcomes — proven by a 138-check offline test harness (in-memory database, mocked suppliers, real HTTP routers) and a ferry round-trip regression suite.",
      "Hotels: turned client requirements into the RateHawk integration as its main contributor (booking finish/status, order info, cancellation penalties) with an hourly cron archiving supplier logs to AWS S3; Via Hotels per-tenant credentials, dynamic emails and a grade-code pricing fix.",
      "In-house products with no third-party supplier: built and run visa processing and holiday/tour packages end to end around client needs — visa modules on the visa service I set up, and packages with tenant-managed suppliers, activities, prices and currencies (140+ backend commits).",
      "Airport shuttles and insurance: Jayride integration shaped by client use cases (booking list, details, wallet payment, redirects); created the travel-insurance microservice end to end (quotes, policies, gateway and wallet booking).",
      "Payments, pricing and flights: integrated Xendit end to end (hosted sessions, webhooks, per-tenant config) and worked on the PayMongo checkout; email-OTP two-step login; grade codes plus agency markups and discounts across products, multi-currency precision, agent and agency management; Angular flight search and booking over Travelport, Sabre and Atlas fares.",
      "Engineering practice: merged 480+ pull requests, including teammates' and release/hot-fix branches; mentor to junior developers; Claude Code and GitHub Copilot for boilerplate, test scaffolding and query tuning, with every change reviewed and tested."
    ]
  },
  {
    company: "EasyRes Travel Technologies Pvt. Ltd., Delhi",
    title: "Frontend Lead / Full Stack Engineer",
    duration: "Jun 2022 – Jul 2024",
    points: [
      "Top contributor to the Angular consumer portal and the subscriber-admin portal (about 280 admin components across flights, hotels, tours, visa, ferry, shuttle and insurance).",
      "Built the B2B agent portal from scratch (Nov 2023): flights, hotels, account management and agent home page.",
      "Built the B2C hotel booking flow (search, filters, paged results, cancellation policy, promo codes) and later Hotel v2 for B2B and B2C.",
      "Built the airport-transfer module and the visa module (search, application, status tracking), and set up the visa microservice in Node.js.",
      "Built multi-method checkout with per-method absolute or percentage surcharges (card, bank transfer, UPI and e-wallets).",
      "Built wallet top-up and credit requests, agency earnings, grade plans and agency/airline markup screens.",
      "Created a per-product SCSS theming system used by several white-label tenant portals.",
      "Built booking voucher, itinerary and e-ticket generation for flights, hotels, packages, tours and transfers."
    ]
  },
  {
    company: "OpsX (opsx.in) — Opsx Apex Private Limited, Gaya",
    title: "Principal System Architect & Product Creator",
    duration: "Jun 2026 – Present",
    points: [
      "Created OpsX, a multi-tenant industrial ERP and workforce OS: attendance, payroll, field staff, factory kiosk, procurement and stock — 760+ commits as sole engineer.",
      "Nx monorepo of 7 apps (NestJS API, BullMQ worker, Socket.IO realtime, Angular ERP portal, control center, React Native field and kiosk apps) over 50+ backend domains.",
      "Architected edge-first attendance: offline SQLite queue with batch sync and on-device face verification on kiosk tablets.",
      "Designed tenant isolation (a shared or dedicated database per tenant, chosen by plan), hierarchical RBAC entitlements and maker-checker approval workflows.",
      "Automated statutory payroll (PF, ESI, TDS, professional tax, full & final) posted to a double-entry ledger in PostgreSQL.",
      "Run it in production on AWS EC2: rolling restarts across two API instances, BullMQ workers on Redis, nginx."
    ]
  },
  {
    // Title and dates as on the VKREATE relieving letter (10 Jun 2021 – 5 Jun 2022).
    company: "VKREATE Software Technologies Pvt. Ltd., Jaipur",
    title: "Junior Front-End Developer",
    duration: "Jun 2021 – Jun 2022",
    points: [
      "Developed and maintained production CRM dashboards using Angular.",
      "Integrated REST APIs for real-time data visualization and reporting.",
      "Improved UI performance and usability for business users."
    ]
  },
  {
    // As on the VKREATE internship certificate (2 Apr 2020 – 21 Dec 2020).
    company: "VKREATE Software Technologies Pvt. Ltd., Jaipur",
    title: "Web Development Intern (JavaScript)",
    duration: "Apr 2020 – Dec 2020",
    points: [
      "Completed a nine-month internship in web development with JavaScript, working as part of the development team."
    ]
  },
  {
    company: "Arden Telecom Pvt. Ltd., Jaipur",
    title: "Software Engineer Intern",
    duration: "Jun 2019 – Oct 2019",
    points: [
      "Assisted in development of internal tools using PHP, HTML, and CSS.",
      "Worked on dashboard modules and API integrations."
    ]
  }
];

/**
 * Suppliers and tools that get a scan-friendly pill under the bullet that names them.
 * The pills repeat words already in the bullet; the bullet text itself is unchanged.
 */
export const highlightTerms: string[] = [
  "Travelport", "Sabre", "Atlas", "RateHawk", "GRN Connect", "Dida", "Bedsonline", "Via Hotels", "Via.com",
  "2GO", "Barkota", "Starlite", "Jayride", "Xendit", "PayMongo", "AWS S3", "AWS EC2", "Node.js", "NestJS",
  "Angular", "React Native", "BullMQ", "Redis", "Socket.IO", "PostgreSQL", "SQLite", "nginx", "Nx", "SCSS",
  "PHP", "REST APIs", "Claude Code", "GitHub Copilot", "UPI",
];
