"use client";

import {
  Clock,
  Award,
  Target,
  Github,
  Linkedin,
  Zap,
  Lightbulb,
  Layers,
} from "lucide-react";
import Image from "next/image";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import Link from "next/link";

const stats = [
  { value: 20, suffix: "+", label: "Years Experience", icon: Clock },
  { value: 3, suffix: "", label: "Olympic Games", icon: Award },
  { value: 25, suffix: "%", label: "Accuracy Boost", icon: Target },
  { value: 23, suffix: "", label: "GitHub Repos", icon: Github },
];

const values = [
  {
    title: "Ship Fast",
    desc: "Weeks, not months. Prototype to production rapidly.",
    icon: Zap,
  },
  {
    title: "One Expert, Full Stack",
    desc: "No team coordination overhead. Single point of contact.",
    icon: Layers,
  },
  {
    title: "Battle-Tested",
    desc: "Olympic-scale systems that simply cannot fail.",
    icon: Target,
  },
  {
    title: "Lean Solutions",
    desc: "No over-engineering. Lower maintenance, lower cost.",
    icon: Lightbulb,
  },
];

const timeline = [
  { year: "2006", title: "Started Engineering Journey", company: "Infosys" },
  { year: "2015", title: "Joined MRMC/Nikon", company: "London & India" },
  { year: "2017", title: "Principal Engineer", company: "R&D Leadership" },
  { year: "2024", title: "Founded Ohboy Consultancy", company: "Dubai, UAE" },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <BlurFade>
          <div className="mb-16">
            <span className="text-emerald-500 font-mono text-sm tracking-wider">
              {"/// ABOUT"}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
              The <span className="text-gradient-emerald">&ldquo;Ohboy&rdquo;</span> Moment
            </h2>
          </div>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Story */}
          <div>
            <BlurFade delay={0.1}>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-xl text-slate-300 leading-relaxed mb-6">
                  That moment when you realize:{" "}
                  <span className="text-white font-medium">
                    one senior engineer can deliver what typically requires 3 specialists
                  </span>{" "}
                  and{" "}
                  <span className="text-white font-medium">
                    months of coordination
                  </span>
                  .
                </p>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Skip the hiring process, avoid vendor coordination headaches,
                  and get your product shipped faster. With 20 years bridging
                  hardware, software, and AI — I bring fractional CTO expertise
                  at a fraction of the cost and time.
                </p>
              </div>
            </BlurFade>

            {/* Values Grid */}
            <BlurFade delay={0.2}>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {values.map((value, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-emerald-500/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <value.icon
                        size={20}
                        className="text-emerald-500 group-hover:scale-110 transition-transform"
                      />
                      <h4 className="font-semibold text-white">{value.title}</h4>
                    </div>
                    <p className="text-sm text-slate-400">{value.desc}</p>
                  </div>
                ))}
              </div>
            </BlurFade>

            {/* Stats */}
            <BlurFade delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t border-slate-800/50">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-display">
                      <NumberTicker value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider flex items-center justify-center gap-1">
                      <stat.icon size={14} className="text-emerald-500" />
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>

          {/* Right Column - Profile Card + Timeline */}
          <div className="space-y-8">
            {/* Profile Card */}
            <BlurFade delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />
                <div className="relative terminal-window">
                  <div className="terminal-header">
                    <div className="terminal-dot bg-red-500/60" />
                    <div className="terminal-dot bg-yellow-500/60" />
                    <div className="terminal-dot bg-emerald-500" />
                    <span className="ml-4 text-xs text-slate-500 font-mono">
                      aravind@ohboy ~
                    </span>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-6">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border border-emerald-500/30 flex-shrink-0 group">
                        <Image
                          src="/images/founder-portrait.jpeg"
                          alt="Aravind Vijayakumar - Principal Consultant"
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-transparent transition-all" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          Aravind Vijayakumar
                        </h3>
                        <p className="text-emerald-400 font-mono text-sm mb-3">
                          Principal Consultant
                        </p>
                        <p className="text-slate-400 text-sm">
                          Dubai, UAE • BTech Electronics & Telecom
                        </p>
                      </div>
                    </div>

                    {/* Code-style bio */}
                    <div className="mt-6 p-4 rounded-lg bg-slate-950/50 border border-slate-800/50 font-mono text-sm">
                      <div className="text-slate-500">{"// expertise.json"}</div>
                      <div className="mt-2 text-slate-300">
                        <span className="text-purple-400">const</span> skills = [
                        <br />
                        <span className="pl-4 text-emerald-400">
                          &quot;C++/Qt&quot;
                        </span>
                        ,{" "}
                        <span className="text-emerald-400">
                          &quot;Python&quot;
                        </span>
                        ,{" "}
                        <span className="text-emerald-400">&quot;Rust&quot;</span>,
                        <br />
                        <span className="pl-4 text-emerald-400">
                          &quot;Embedded&quot;
                        </span>
                        ,{" "}
                        <span className="text-emerald-400">
                          &quot;AI/ML&quot;
                        </span>
                        ,{" "}
                        <span className="text-emerald-400">
                          &quot;Full-Stack&quot;
                        </span>
                        <br />
                        ];
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3 mt-6">
                      <Link
                        href="https://github.com/ohboyftw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:border-slate-600 transition-all text-sm"
                        aria-label="View Aravind's GitHub profile"
                      >
                        <Github size={16} />
                        ohboyftw
                      </Link>
                      <Link
                        href="https://linkedin.com/in/aravindvijayakumar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:border-slate-600 transition-all text-sm"
                        aria-label="View Aravind's LinkedIn profile"
                      >
                        <Linkedin size={16} />
                        LinkedIn
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>

            {/* Timeline */}
            <BlurFade delay={0.3}>
              <div className="relative pl-8 border-l-2 border-slate-800 space-y-8">
                {timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-500" />
                    <div className="text-xs text-emerald-500 font-mono mb-1">
                      {item.year}
                    </div>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.company}</p>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
