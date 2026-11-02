import type { IconType } from "react-icons";
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaMedium } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { profile } from "../../data/profile";

const SOCIALS: { label: string; url: string; Icon: IconType }[] = [
    { label: "LinkedIn", url: profile.linkedin, Icon: FaLinkedin },
    { label: "GitHub", url: profile.github, Icon: FaGithub },
    { label: "X (@thisvinaykumar)", url: profile.x, Icon: FaXTwitter },
    { label: "Instagram (@thisvinaykumar)", url: profile.instagram, Icon: FaInstagram },
    { label: "Facebook", url: profile.facebook, Icon: FaFacebook },
    { label: "Medium (@javaScriptwithvinay)", url: profile.medium, Icon: FaMedium },
];

export default function Footer() {
    return (
        <footer className="bg-background/90 border-t border-slate-800 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-header text-sm text-center md:text-left">
                    <p>&copy; 2026 Opsx Apex Private Limited. All rights reserved.</p>
                    <p className="mt-1 text-muted">
                        Vinay Kumar (@thisvinaykumar)
                        {" · "}
                        <a href={profile.opsx} target="_blank" rel="noopener noreferrer" className="hover:text-primary">OpsX</a>
                        {" · "}
                        <a href={profile.ngo} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Shubhsaathi Foundation</a>
                        {" · "}
                        <a href="#ecosystem" className="hover:text-primary">All profiles</a>
                    </p>
                </div>

                <div className="flex gap-5 text-header items-center">
                    {SOCIALS.map(({ label, url, Icon }) => (
                        <a
                            key={url}
                            href={url}
                            target="_blank"
                            rel="me noopener noreferrer"
                            aria-label={label}
                            title={label}
                            className="hover:text-primary transition"
                        >
                            <Icon size={18} />
                        </a>
                    ))}
                    <a href={`mailto:${profile.email}`} aria-label="Email" title={profile.email} className="hover:text-primary transition">
                        <FaEnvelope size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
