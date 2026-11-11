import type { IconType } from "react-icons";
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaMedium } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { profile } from "../../content/profile";
import { footer } from "../../content/site";

const L = footer.socialLabels;
const SOCIALS: { label: string; url: string; Icon: IconType }[] = [
    { label: L.linkedin, url: profile.linkedin, Icon: FaLinkedin },
    { label: L.github, url: profile.github, Icon: FaGithub },
    { label: L.x, url: profile.x, Icon: FaXTwitter },
    { label: L.instagram, url: profile.instagram, Icon: FaInstagram },
    { label: L.facebook, url: profile.facebook, Icon: FaFacebook },
    { label: L.medium, url: profile.medium, Icon: FaMedium },
];

export default function Footer() {
    return (
        <footer className="bg-background/90 border-t border-slate-800 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-header text-sm text-center md:text-left">
                    <p>{footer.copyright}</p>
                    <p className="mt-1 text-muted">
                        {footer.byline}
                        {" · "}
                        <a href={profile.opsx} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{footer.opsx}</a>
                        {" · "}
                        <a href={profile.ngo} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{footer.ngo}</a>
                        {" · "}
                        <a href={footer.allProfiles.href} className="hover:text-primary">{footer.allProfiles.label}</a>
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
                    <a href={`mailto:${profile.email}`} aria-label={L.email} title={profile.email} className="hover:text-primary transition">
                        <FaEnvelope size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
