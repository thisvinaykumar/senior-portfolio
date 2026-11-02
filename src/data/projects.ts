export interface Project {
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
  github?: string;
  liveDemo?: string;
}

export const projects: Project[] = [
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
