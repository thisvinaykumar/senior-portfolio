export interface Experience {
  company: string;
  title: string;
  duration: string;
  points: string[];
}

export const experience: Experience[] = [
  {
    company: "OpsX (opsx.in) — Opsx Apex Private Limited, Gaya",
    title: "Principal System Architect & Product Creator",
    duration: "2026 – Present",
    points: [
      "Created OpsX, a multi-tenant industrial ERP and workforce OS: attendance, payroll, field staff, kiosk, procurement and stock.",
      "Architected edge-first attendance: offline SQLite queue with batch sync and on-device face verification on kiosk tablets.",
      "Built geofenced attendance and field tracking with live maps, trips and proof of delivery.",
      "Designed tenant isolation (database per tenant), hierarchical RBAC entitlements and maker-checker approval workflows.",
      "Automated statutory payroll (PF, ESI, TDS, professional tax, full & final) posted to a double-entry ledger in PostgreSQL.",
      "Run it in production on AWS EC2: NestJS API with rolling restarts, BullMQ workers on Redis, Socket.IO realtime, nginx."
    ]
  },
  {
    company: "EasyRes Travel Technologies Pvt. Ltd., Delhi",
    title: "Software Development Engineer II (Full Stack)",
    duration: "Jul 2024 – Present",
    points: [
      "Led development of multi-tenant SaaS travel platform supporting B2B & B2C users.",
      "Designed and implemented RBAC for subscribers, agencies, agents, and consumers.",
      "Owned end-to-end feature delivery for Holiday, Ferry, Visa, and Insurance modules.",
      "Built agency–agent hierarchy, pricing markup rules, grade plans, and wallet systems.",
      "Integrated third-party travel APIs for real-time pricing and availability.",
      "Improved application performance by ~30% via Angular optimization and API tuning.",
      "Mentored 3–5 junior developers, conducted code reviews, and enforced best practices."
    ]
  },
  {
    company: "EasyRes Travel Technologies Pvt. Ltd., Delhi",
    title: "Frontend Lead / Full Stack Engineer",
    duration: "Jun 2022 – Jul 2024",
    points: [
      "Led frontend development for Admin and Consumer portals across flights, hotels, holidays, visas, ferry, and insurance modules.",
      "Implemented complex Angular-based modules with performance optimization.",
      "Collaborated with backend team to design APIs and optimize response times.",
      "Mentored junior frontend developers and conducted design/code reviews."
    ]
  },
  {
    company: "VKREATE Software Technologies Pvt. Ltd., Jaipur",
    title: "Frontend Developer",
    duration: "Jan 2021 – May 2022",
    points: [
      "Developed and maintained production CRM dashboards using Angular.",
      "Integrated REST APIs for real-time data visualization and reporting.",
      "Improved UI performance and usability for business users."
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
