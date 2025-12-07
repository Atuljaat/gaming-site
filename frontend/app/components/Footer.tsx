import Link from 'next/link';
import { Twitter, Instagram, Github, Gamepad2 } from 'lucide-react';

const footerLinks = [
    {
        title: "Platform",
        links: [
            { label: "Games", href: "/games" },
            { label: "Tournaments", href: "/tournaments" },
            { label: "VIP Club", href: "/vip" },
            { label: "Promotions", href: "/promotions" },
        ]
    },
    {
        title: "Support",
        links: [
            { label: "Help Center", href: "/help" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Fairness", href: "/fairness" },
        ]
    },
    {
        title: "Community",
        links: [
            { label: "Discord", href: "#" },
            { label: "Twitter", href: "#" },
            { label: "Telegram", href: "#" },
            { label: "Blog", href: "/blog" },
        ]
    }
];

export default function Footer() {
    return (
        <footer className="bg-black/90 border-t border-white/10 pt-16 pb-8 text-sm">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/40 transition-colors">
                                <Gamepad2 className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                NEXUS<span className="text-primary">GAMING</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
                            The premier destination for next-generation competitive gaming.
                            Join our community, compete in daily tournaments, and earn real rewards in a fair, secure environment.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Github].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map((column, i) => (
                        <div key={i}>
                            <h3 className="font-bold text-white mb-6">{column.title}</h3>
                            <ul className="space-y-4">
                                {column.links.map((link, j) => (
                                    <li key={j}>
                                        <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500">
                    <p>© 2024 Nexus Gaming. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>18+ Play Responsibly</span>
                        <span>Protected by reCAPTCHA</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
