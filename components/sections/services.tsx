"use client";

import { Layers, BrainCircuit, Globe, Cpu, Check, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import Link from "next/link";

const services = [
  {
    title: "Technical Architecture & Consulting",
    description:
      "Strategic technical guidance for product companies navigating complex engineering decisions. System design, code review, and fractional CTO leadership.",
    icon: Layers,
    features: [
      "System Architecture Design",
      "Technology Stack Selection",
      "Code Review & Quality Assessment",
      "Fractional CTO Leadership",
      "Technical Due Diligence",
    ],
    color: "emerald",
  },
  {
    title: "AI/ML Solutions",
    description:
      "End-to-end AI implementation from concept to production. LLM applications, medical AI, computer vision, and agentic systems.",
    icon: BrainCircuit,
    features: [
      "LLM Application Development",
      "AI Agent Development (MCP)",
      "Medical AI Solutions",
      "Computer Vision Systems",
      "Healthcare Analytics",
    ],
    color: "cyan",
  },
  {
    title: "Full-Stack Product Development",
    description:
      "Complete product development from MVP to scale. Desktop applications, web platforms, CLI tools, and API design.",
    icon: Globe,
    features: [
      "Desktop Apps (Qt/QML, Python)",
      "Web Apps (FastAPI, React)",
      "CLI Tools (Rust, Python)",
      "API Design & Development",
      "CI/CD Pipeline Setup",
    ],
    color: "purple",
  },
  {
    title: "Embedded Systems & Firmware",
    description:
      "Hardware-software integration for IoT, robotics, and specialized devices. Real-time systems with mission-critical reliability.",
    icon: Cpu,
    features: [
      "Firmware (STM32, ARM, TI DSP)",
      "OpenWRT Customization",
      "Real-Time OS (FreeRTOS)",
      "Protocol Implementation",
      "Hardware Debugging",
    ],
    color: "orange",
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    hover: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    hover: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-400",
    hover: "hover:border-purple-500/50 hover:shadow-purple-500/10",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-400",
    hover: "hover:border-orange-500/50 hover:shadow-orange-500/10",
  },
};

const techStack = [
  "C++",
  "Python",
  "Rust",
  "TypeScript",
  "Qt/QML",
  "React",
  "FastAPI",
  "STM32",
  "OpenWRT",
  "FreeRTOS",
  "PostgreSQL",
  "GStreamer",
  "Docker",
  "Git",
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <BlurFade>
          <div className="max-w-3xl mb-16">
            <span className="text-emerald-500 font-mono text-sm tracking-wider">
              {"/// SERVICES"}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
              What I <span className="text-gradient-emerald">Build</span>
            </h2>
            <p className="text-lg text-slate-400">
              Specialized expertise across the full technology stack, from
              bare-metal firmware to cloud-scale AI systems.
            </p>
          </div>
        </BlurFade>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const colors = colorClasses[service.color];
            return (
              <BlurFade key={i} delay={0.1 + i * 0.1}>
                <Card
                  variant="glow"
                  className={`h-full p-8 bg-slate-900/50 ${colors.hover} transition-all duration-500 hover:shadow-2xl`}
                >
                  <CardHeader className="p-0 mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <service.icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {service.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-slate-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2 text-sm text-slate-300"
                        >
                          <Check size={14} className={colors.text} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="#contact"
                      className={`inline-flex items-center gap-2 mt-6 text-sm font-medium ${colors.text} hover:gap-3 transition-all`}
                    >
                      Discuss Your Project
                      <ArrowRight size={14} />
                    </Link>
                  </CardContent>
                </Card>
              </BlurFade>
            );
          })}
        </div>

        {/* Tech Stack Marquee */}
        <BlurFade delay={0.5}>
          <div className="mt-16 pt-16 border-t border-slate-800/50">
            <p className="text-center text-xs text-slate-500 font-mono mb-6 uppercase tracking-wider">
              Technologies & Frameworks
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
