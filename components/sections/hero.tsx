"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Typewriter } from "@/components/magicui/typewriter";
import { Particles } from "@/components/magicui/particles";
import Link from "next/link";

const heroMessages = [
  "Ship in Weeks, Not Months",
  "One Expert, Full Stack Coverage",
  "Battle-Tested at Olympic Scale",
  "Fractional CTO, Full Impact",
];

const trustBadges = [
  { name: "OLYMPICS", detail: "3 Games" },
  { name: "FIFA", detail: "World Cup" },
  { name: "WIMBLEDON", detail: "Championships" },
  { name: "NIKON", detail: "MRMC" },
  { name: "CANNES", detail: "Film Festival" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <Particles quantity={80} />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Availability Badge */}
          <BlurFade delay={0}>
            <Badge
              variant="outline"
              className="mb-8 px-4 py-2 bg-slate-900/60 border-slate-700/50 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-emerald-400 tracking-wide">
                AVAILABLE FOR NEW PROJECTS
              </span>
            </Badge>
          </BlurFade>

          {/* Main Headline */}
          <BlurFade delay={0.1}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[0.9]">
              <span className="text-gradient">Bridging</span>{" "}
              <span className="text-slate-500">Hardware</span>,
              <br />
              <span className="text-slate-500">Software</span>, &{" "}
              <span className="text-gradient-emerald">AI</span>
              <span className="text-emerald-500">.</span>
            </h1>
          </BlurFade>

          {/* Typewriter Subtitle */}
          <BlurFade delay={0.2}>
            <div className="h-10 mb-8 font-mono text-emerald-400/90 text-lg md:text-xl flex items-center justify-center gap-2">
              <span className="text-slate-500">&gt;</span>
              <Typewriter phrases={heroMessages} />
            </div>
          </BlurFade>

          {/* Description */}
          <BlurFade delay={0.3}>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              One senior engineer delivering what typically requires{" "}
              <span className="text-white">3 specialists</span> and{" "}
              <span className="text-white">months of coordination</span>.
              From prototype to production in{" "}
              <span className="text-white">weeks, not months</span>.
            </p>
          </BlurFade>

          {/* CTAs */}
          <BlurFade delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button variant="gradient" size="xl" asChild>
                <Link href="#contact" className="flex items-center gap-3">
                  <Calendar size={20} />
                  Book Discovery Call
                  <span className="text-emerald-200 text-sm font-normal">
                    — Free
                  </span>
                </Link>
              </Button>

              <Button variant="outline" size="xl" asChild>
                <Link
                  href="#portfolio"
                  className="flex items-center gap-2 group"
                >
                  View Work
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </Button>
            </div>
          </BlurFade>

          {/* Trust Badges */}
          <BlurFade delay={0.5}>
            <div className="border-t border-slate-800/50 pt-10">
              <p className="text-xs text-slate-500 font-mono mb-6 uppercase tracking-[0.2em]">
                Systems Delivered For Global Events
              </p>
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                {trustBadges.map((badge, i) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="group flex flex-col items-center"
                  >
                    <span className="text-lg md:text-xl font-bold text-slate-500 group-hover:text-white transition-colors duration-300">
                      {badge.name}
                    </span>
                    <span className="text-[10px] text-slate-600 font-mono mt-1">
                      {badge.detail}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="text-xs font-mono">SCROLL</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
