"use client";

import { Terminal, Github, Linkedin, Mail, Code2 } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ohboyftw",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/aravindvijayakumar",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:aravind@ohboyconsultancy.com",
    icon: Mail,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="#" className="flex items-center gap-2">
              <Terminal size={18} className="text-emerald-500" />
              <span className="font-mono font-bold">
                OHBOY<span className="text-emerald-500">_</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 font-mono">
              © {currentYear} Ohboy Consultancy FZ LLC
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-slate-500">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-500/30 transition-all"
              >
                <link.icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-8 pt-8 border-t border-slate-900 text-center">
          <p className="text-sm text-slate-600 flex items-center justify-center gap-2">
            Built with <span className="text-emerald-500">grit</span> and{" "}
            <Code2 size={14} className="text-emerald-500" /> in Dubai
          </p>
        </div>
      </div>
    </footer>
  );
}
