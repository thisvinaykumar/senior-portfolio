/**
 * Every piece of copy that used to be typed inline in a section or layout component.
 * Components render from here; scripts/content-parity.mjs proves nothing was lost.
 *
 * Rich text: a paragraph is a list of runs; a run is plain text, a link, or emphasised text.
 */
export type Run = string | { text: string; href: string } | { text: string; strong: true };
export type Paragraph = Run[];

export const resumeUrl = "/assets/Vinay_Kumar_Senior_Software_Engineer_System_Architect.pdf";
export const mediumUrl = "https://medium.com/@javaScriptwithvinay";

export const nav = {
  brand: "Vinay Kumar",
  // Same order as the page (the storyboard runs top to bottom in this order).
  items: [
    { label: "Home", id: "hero" },
    { label: "Summary", id: "summary" },
    { label: "Architecture", id: "architecture" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Leadership", id: "leadership" },
    { label: "Blog", id: "blog" },
    { label: "Ecosystem", id: "ecosystem" },
    { label: "Contact", id: "contact" },
  ],
  menu: "Menu",
  search: "Search",
  lightMode: "Light Mode",
  darkMode: "Dark Mode",
  toggleTheme: "Toggle theme",
  toggleMenu: "Toggle menu",
};

export const hero = {
  name: "Vinay Kumar",
  tagline: "Senior Software Engineer & System Architect · Node.js · NestJS · Angular · Multi-Tenant ERP",
  intro: [
    "5+ years building multi-tenant SaaS platforms. Full-stack engineer on the EasyRes B2B/B2C travel marketplace since 2022, and creator of ",
    { text: "OpsX", href: "https://opsx.in/" },
    ", an industrial ERP and workforce OS — owned from architecture to production.",
  ] as Paragraph,
  ctaContact: { label: "Contact", aria: "Contact me", href: "#contact" },
  ctaResume: { label: "Download Resume", aria: "Download Vinay Kumar resume PDF" },
  ctaGithub: { label: "GitHub", aria: "Open GitHub in new tab" },
  status: "Open to senior engineer & architect roles",
  paletteHint: { before: "Press", after: "to jump anywhere" },
  terminal: {
    title: "~/vinay — zsh",
    lines: [
      { kind: "cmd", text: "whoami" },
      { kind: "out", text: "vinay-kumar · senior software engineer & system architect" },
      { kind: "cmd", text: "cat stack.txt" },
      { kind: "out", text: "node · nestjs · angular · typescript · mongodb · postgres · redis · aws" },
      { kind: "cmd", text: "git log --author=vinay --oneline | wc -l   # EasyRes, 24 repos" },
      { kind: "out", text: "~3,000" },
      { kind: "cmd", text: "./book-ferry --supplier=via --scenario=timeout" },
      { kind: "ok", text: "✓ claim → debit once → poll → settled · no double charge" },
    ] as { kind: "cmd" | "out" | "ok"; text: string }[],
  },
  metricsLabel: "By the numbers",
  metrics: [
    { value: 5, suffix: "+", label: "years shipping production software" },
    { value: 3000, prefix: "~", label: "commits across 24 EasyRes repositories" },
    { value: 480, suffix: "+", label: "pull requests reviewed and merged" },
    { value: 20, suffix: "+", label: "Node.js microservices in the travel platform" },
    { value: 760, suffix: "+", label: "OpsX commits, designed and built solo" },
    { value: 138, label: "checks in the offline money-safety test harness" },
  ] as { value: number; prefix?: string; suffix?: string; label: string }[],
  scrollCue: "Scroll",
};

/** Section eyebrows: the storyboard's chapter numbers. */
export const chapters: Record<string, string> = {
  summary: "01 · Profile",
  architecture: "02 · Systems",
  experience: "03 · Career",
  projects: "04 · Work",
  skills: "05 · Stack",
  leadership: "06 · People",
  blog: "07 · Writing",
  ecosystem: "08 · Elsewhere",
  contact: "09 · Contact",
};

export const summaryLabels = ["In one line", "Stack & scope", "At EasyRes", "What I care about", "Writing"];

export const palette = {
  title: "Command palette",
  placeholder: "Type a command or search…",
  empty: "No matches.",
  groups: { navigate: "Navigate", actions: "Actions", profiles: "Profiles" },
  goTo: "Go to",
  downloadResume: "Download resume (PDF)",
  emailMe: "Email Vinay",
  copyEmail: "Copy email address",
  copied: "Email address copied",
  call: "Call",
  toggleTheme: "Switch light / dark theme",
  hints: { navigate: "navigate", open: "open", close: "close" },
};

export const dock = {
  label: "Quick actions",
  resume: "Download resume",
  email: "Email",
  linkedin: "LinkedIn",
  github: "GitHub",
  palette: "Open command palette",
};

export const summary = {
  heading: "Executive Summary",
  paragraphs: [
    ["Senior Software Engineer & System Architect with 5+ years of experience in two worlds: high-scale multi-tenant travel SaaS, and complex distributed systems and ERPs. I deliver end to end — from architecture and data model to production deployment."],
    ["Works across Node.js, NestJS, Angular, TypeScript, MongoDB, Redis, Docker and AWS EC2, with a deep understanding of system design, microservices, API integration and performance. As Principal System Architect & Product Creator of OpsX (opsx.in), designed edge-first attendance, geofencing, RBAC and automated payroll for Indian SMEs."],
    ["At EasyRes Travel Technologies (since 2022) I am a full-stack engineer on a multi-tenant B2B/B2C travel marketplace — the top contributor to its Angular consumer and admin portals, with about 3,000 commits across 24 repositories. I built the B2B agent portal, created the travel-insurance and Via.com ferry microservices, and integrated suppliers and payments including 2GO, Barkota, Starlite Ferries, RateHawk, Via Hotels, Jayride and Xendit."],
    ["I care about money-safe booking flows (atomic wallet claims, automatic reversals, a 138-check offline test harness), financial accuracy (OpsX posts payroll to a double-entry ledger in PostgreSQL), and code reviews — I have merged 480+ pull requests, including teammates' and release branches. I ship faster with AI coding assistants (Claude Code, GitHub Copilot) for boilerplate, test scaffolding and query tuning, while reviewing and testing every change myself."],
    [
      "I regularly write about JavaScript, software development, and tips for preparing for MNC interviews. Some of my posts are featured on ",
      { text: "Medium", href: mediumUrl },
      ".",
    ],
  ] as Paragraph[],
};

export const skillsSection = { heading: "Technical Expertise" };
export const experienceSection = { heading: "Professional Experience" };
export const projectsSection = { heading: "Flagship Projects", github: "GitHub", liveDemo: "Live Demo" };
export const ecosystemSection = { heading: "Ecosystem" };

export const architecture = {
  heading: "System Design & Architecture",
  paragraphs: [
    [
      { text: "OpsX (opsx.in)", strong: true },
      " — as Principal System Architect & Product Creator: edge-first attendance (offline SQLite queue with batch sync, on-device face verification), geofenced attendance and field tracking, a shared or dedicated database per tenant (by plan) with hierarchical RBAC and maker-checker approvals, and automated payroll (PF, ESI, TDS) posted to a double-entry ledger. NestJS, BullMQ on Redis and Socket.IO, running on AWS EC2.",
    ],
    ["EasyRes travel marketplace — 20+ Node.js microservices, one per product, on a subscriber → agency → agent multi-tenant model. Designed the Via.com ferry service (search → seat block → payment → book → resumable status polling) and created the travel-insurance service."],
    ["Money-safe booking: atomic claims before every wallet or supplier side effect, automatic wallet reversal on failed bookings and a manual-review path for unknown outcomes — proven by a 138-check offline test harness. Multi-level pricing with subscriber grade codes and agency markups."],
    ["Owned frontend architecture for the Angular consumer and admin portals: the B2B agent portal built from scratch, and a per-product SCSS theming system for white-label tenant portals."],
  ] as Paragraph[],
};

export const leadership = {
  heading: "Leadership & Mentorship",
  paragraphs: [
    "Actively mentored junior and mid-level developers, guiding them in best practices, code quality, and architectural decisions.",
    "Reviewed and merged 480+ pull requests on the EasyRes consumer portal — teammates' feature branches as well as release and hot-fix branches — across Flights, Hotels, Ferry, Holidays, Insurance and Wallet modules.",
    "Led feature ownership for critical modules, collaborating with product, backend, and QA teams to deliver high-impact features with measurable business value.",
    "Promoted engineering standards across teams, including reusable component libraries, performance optimization techniques, and system design guidelines.",
  ],
};

export const blog = {
  heading: "Blog & Insights",
  subtitle: "Sharing knowledge on JavaScript, software development, and MNC interview preparation",
  intro: "I regularly write articles to share insights and best practices in software development. My posts cover:",
  topics: [
    "JavaScript tips and advanced patterns",
    "Full Stack development practices",
    "Preparation strategies for top MNC technical interviews",
  ],
  cta: { label: "Explore My Articles on Medium", href: mediumUrl },
};

export const contact = {
  heading: "Get in Touch",
  line: "Open to senior software engineer and system architect roles in product-based companies.",
};

export const footer = {
  copyright: "© 2026 Opsx Apex Private Limited. All rights reserved.",
  byline: "Vinay Kumar (@thisvinaykumar)",
  opsx: "OpsX",
  ngo: "Shubhsaathi Foundation",
  allProfiles: { label: "All profiles", href: "#ecosystem" },
  socialLabels: {
    linkedin: "LinkedIn",
    github: "GitHub",
    x: "X (@thisvinaykumar)",
    instagram: "Instagram (@thisvinaykumar)",
    facebook: "Facebook",
    medium: "Medium (@javaScriptwithvinay)",
    email: "Email",
  },
};
