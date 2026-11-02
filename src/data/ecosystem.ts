// The visible "Ecosystem" section: every official profile, grouped. Keep these URLs identical to
// the JSON-LD sameAs list in index.html so Google ties all of them to one person.
export type EcoIcon = "linkedin" | "github" | "x" | "instagram" | "facebook" | "medium" | "youtube" | "web" | "ngo";

export interface EcoLink {
  label: string;
  handle: string;
  url: string;
  icon: EcoIcon;
}

export interface EcoGroup {
  title: string;
  blurb: string;
  links: EcoLink[];
}

export const ecosystem: EcoGroup[] = [
  {
    title: "Personal",
    blurb: "One handle everywhere: @thisvinaykumar.",
    links: [
      { label: "LinkedIn", handle: "in/thisvinaykumar", url: "https://www.linkedin.com/in/thisvinaykumar/", icon: "linkedin" },
      { label: "GitHub", handle: "@thisvinaykumar", url: "https://github.com/thisvinaykumar", icon: "github" },
      { label: "X", handle: "@thisvinaykumar", url: "https://x.com/thisvinaykumar", icon: "x" },
      { label: "Instagram", handle: "@thisvinaykumar", url: "https://www.instagram.com/thisvinaykumar", icon: "instagram" },
      { label: "Facebook", handle: "thisvinaykumar", url: "https://www.facebook.com/thisvinaykumar", icon: "facebook" },
    ],
  },
  {
    title: "Tech Blog",
    blurb: "JavaScript, TypeScript, Node.js, AI and engineering careers.",
    links: [
      { label: "Medium", handle: "@javaScriptwithvinay", url: "https://medium.com/@javaScriptwithvinay", icon: "medium" },
    ],
  },
  {
    title: "SaaS Architecture",
    blurb: "OpsX — an independent SaaS architecture initiative: multi-tenant industrial ERP and workforce OS.",
    links: [{ label: "OpsX", handle: "opsx.in", url: "https://opsx.in/", icon: "web" }],
  },
  {
    title: "NGO",
    blurb: "Shubhsaathi Foundation — supporting underprivileged families.",
    links: [{ label: "Shubhsaathi Foundation", handle: "shubhsaathi.org", url: "https://shubhsaathi.org/", icon: "ngo" }],
  },
  {
    title: "Content Channels",
    blurb: "Hindi stories and Bihar land-law explainers.",
    links: [
      { label: "Magadh Ka Munshi · YouTube", handle: "@MagadhKaMunshi", url: "https://www.youtube.com/@MagadhKaMunshi", icon: "youtube" },
      { label: "Magadh Ka Munshi · Instagram", handle: "@MagadhKaMunshi", url: "https://www.instagram.com/MagadhKaMunshi", icon: "instagram" },
      { label: "Author Vinay · YouTube", handle: "@authorvinay", url: "https://www.youtube.com/@authorvinay", icon: "youtube" },
      { label: "Author Vinay · Instagram", handle: "@authorvinay", url: "https://www.instagram.com/authorvinay", icon: "instagram" },
    ],
  },
];
