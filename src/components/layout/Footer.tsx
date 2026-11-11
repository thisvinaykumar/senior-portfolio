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
        <footer className="border-t border-line pb-24 pt-10">
            <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-8">
                <div className="text-center text-sm text-muted md:text-left">
                    <p>{footer.copyright}</p>
                    <p className="mt-1 text-faint">
                        {footer.byline}
                        {" · "}
                        <a href={profile.opsx} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                            {footer.opsx}
                        </a>
                        {" · "}
                        <a href={profile.ngo} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                            {footer.ngo}
                        </a>
                        {" · "}
                        <a href={footer.allProfiles.href} className="hover:text-accent">
                            {footer.allProfiles.label}
                        </a>
                    </p>
                </div>

                <div className="flex items-center gap-1 text-muted">
                    {SOCIALS.map(({ label, url, Icon }) => (
                        <a
                            key={url}
                            href={url}
                            target="_blank"
                            rel="me noopener noreferrer"
                            aria-label={label}
                            title={label}
                            className="grid h-9 w-9 place-items-center rounded-lg transition-colors hover:text-accent"
                        >
                            <Icon size={17} />
                        </a>
                    ))}
                    <a
                        href={`mailto:${profile.email}`}
                        aria-label={L.email}
                        title={profile.email}
                        className="grid h-9 w-9 place-items-center rounded-lg transition-colors hover:text-accent"
                    >
                        <FaEnvelope size={17} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
