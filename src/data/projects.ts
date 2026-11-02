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
      "Multi-tenant isolation: a dedicated MongoDB database per tenant and a tenant-scope layer that pins every write; hierarchical RBAC entitlements with maker-checker approvals.",
      "Automated payroll: PF, ESI, TDS, professional tax, arrears and full & final settlement, posted to a double-entry general ledger in PostgreSQL through an outbox.",
      "Operations: NestJS API on two instances with rolling restarts, BullMQ workers on Redis and Socket.IO realtime on AWS EC2 behind nginx."
    ],
    liveDemo: "https://opsx.in/"
  },
  {
    title: "Multi-Tenant SaaS Travel Platform",
    description:
      "Developed a scalable SaaS platform for B2B & B2C travel services including flights, holidays, ferry, visa, and insurance modules.",
    techStack: ["Angular", "Node.js", "TypeScript", "MySQL", "REST APIs"],
    highlights: [
      "Designed RBAC for Admin, Subscriber, Agency, and Consumer roles.",
      "Built pricing engines, markup rules, and wallet systems ensuring financial accuracy.",
      "Integrated multiple third-party travel APIs for real-time pricing and booking."
    ],
    github: "https://github.com/thisvinaykumar/multi-tenant-saas",
    liveDemo: "https://easyres-travel.com"
  },
  {
    title: "Admin Dashboard & CRM",
    description:
      "Developed internal CRM and Admin portals for managing users, bookings, and financial transactions.",
    techStack: ["Angular", "RxJS", "NgRx", "Node.js"],
    highlights: [
      "Implemented data visualization dashboards for business insights.",
      "Optimized frontend performance by ~30% using Angular best practices."
    ]
  },
  {
    title: "Wallet & Pricing System",
    description:
      "Built a robust wallet system with multi-tier pricing for agencies and agents.",
    techStack: ["Node.js", "TypeScript", "MySQL", "REST APIs"],
    highlights: [
      "Ensured auditability and scalability for multi-tenant financial transactions.",
      "Integrated wallet system into SaaS platform with automated rules."
    ]
  }
];
