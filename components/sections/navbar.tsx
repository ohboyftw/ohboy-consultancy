"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu, Github, Calendar, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#portfolio" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "glass py-3 border-b border-slate-800/50"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-lg blur-xl group-hover:bg-emerald-500/40 transition-all" />
              <Logo size={40} showBackground={false} animate={true} className="relative" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-lg tracking-tight leading-none">
                OHBOY<span className="text-emerald-500">_</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-wider">
                CONSULTANCY
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-emerald-500 group-hover:w-1/2 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="https://github.com/ohboyftw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-2"
              aria-label="View GitHub profile"
            >
              <Github size={20} />
            </Link>
            <Button variant="gradient" size="default" asChild>
              <Link href="#contact" className="flex items-center gap-2">
                <Calendar size={16} />
                Book a Call
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <div className="flex flex-col h-full pt-12">
                <nav className="flex flex-col gap-2 flex-1">
                  {navLinks.map((link, i) => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        href={link.href}
                        className="text-2xl font-light text-slate-200 hover:text-emerald-400 py-4 border-b border-slate-800/50 flex justify-between items-center group"
                      >
                        {link.name}
                        <ArrowRight
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500"
                          size={20}
                        />
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="pt-8 border-t border-slate-800">
                  <SheetClose asChild>
                    <Button
                      variant="gradient"
                      size="xl"
                      className="w-full"
                      asChild
                    >
                      <Link href="#contact" className="flex items-center gap-2">
                        <Calendar size={20} />
                        Book Discovery Call — Free
                      </Link>
                    </Button>
                  </SheetClose>
                  <div className="flex justify-center gap-6 mt-6">
                    <Link
                      href="https://github.com/ohboyftw"
                      className="text-slate-400 hover:text-white"
                      aria-label="View GitHub profile"
                    >
                      <Github size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </>
  );
}
