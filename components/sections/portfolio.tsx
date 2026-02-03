"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";
import Link from "next/link";

const filters = ["All", "Enterprise", "AI/ML", "Open Source"];

const projects = [
  {
    title: "MRMC/Nikon Broadcast Systems",
    category: "Enterprise",
    description:
      "Led development of real-time motion control systems for robotic camera heads used in live broadcasts of the world's largest sporting events.",
    longDescription:
      "9+ years delivering mission-critical broadcast systems. Implemented MTP/PTP protocols across Windows, Linux, and STM32. Built real-time player tracking algorithms for FA Cup and Bundesliga broadcasts.",
    stack: ["C++14/17", "Qt/QML", "OpenWRT", "GStreamer", "STM32"],
    metrics: [
      { label: "Accuracy Improvement", value: "25%" },
      { label: "Events Delivered", value: "3 Olympics" },
    ],
    featured: true,
    gradient: "from-emerald-900/30 to-slate-900",
  },
  {
    title: "OrthoLogic Medical AI",
    category: "AI/ML",
    description:
      "Full-stack AI-powered orthopedic diagnostic platform with real-time inference capabilities.",
    longDescription:
      "Led end-to-end development including requirements specification, scalable architecture design, and CI/CD pipeline establishment.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "AI/ML"],
    metrics: [{ label: "Type", value: "Healthcare AI" }],
    gradient: "from-blue-900/30 to-slate-900",
  },
  {
    title: "Healthcare Qualitative Analysis",
    category: "AI/ML",
    description:
      "LLM-based desktop application for qualitative data analysis implementing Braun & Clarke's six-phase thematic analysis.",
    stack: ["Python", "LLM APIs", "Desktop UI"],
    metrics: [{ label: "Framework", value: "Braun & Clarke" }],
    gradient: "from-purple-900/30 to-slate-900",
  },
  {
    title: "Rust CLI Agent",
    category: "Open Source",
    description:
      "Sophisticated command-line coding assistant supporting multiple LLM providers with intelligent orchestration.",
    longDescription:
      "Multi-provider support (OpenAI, Claude, Gemini, DeepSeek, Ollama). Extensible tool system for file operations, shell commands, and web search.",
    stack: ["Rust", "Tokio", "Multi-LLM", "CLI"],
    link: "https://github.com/ohboyftw/rust-cli-agent",
    gradient: "from-orange-900/30 to-slate-900",
  },
  {
    title: "Meta MCP Server",
    category: "Open Source",
    description:
      "FastMCP-based server for discovering, installing, and managing MCP (Model Context Protocol) servers.",
    stack: ["Python", "FastAPI", "MCP"],
    link: "https://github.com/ohboyftw/meta-mcp",
    gradient: "from-cyan-900/30 to-slate-900",
  },
];

export function Portfolio() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <BlurFade>
            <div>
              <span className="text-emerald-500 font-mono text-sm tracking-wider">
                {"/// SELECTED WORK"}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
                Portfolio
              </h2>
            </div>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === f
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                      : "bg-slate-900/80 text-slate-400 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </BlurFade>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Card
                  className={`group relative overflow-hidden border-slate-800/50 bg-gradient-to-br ${project.gradient} hover:border-emerald-500/30 transition-all duration-500`}
                >
                  <div
                    className={`flex flex-col ${project.featured ? "lg:flex-row" : ""}`}
                  >
                    {/* Visual Area */}
                    <div
                      className={`relative ${project.featured ? "lg:w-1/2" : ""} min-h-[200px] lg:min-h-[280px] bg-slate-900/50 overflow-hidden`}
                    >
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[120px] font-bold text-slate-800 font-display select-none">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      </div>

                      <div className="absolute top-4 left-4">
                        <Badge variant="tech">{project.category}</Badge>
                      </div>

                      {project.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="success" className="flex items-center gap-1">
                            <Sparkles size={12} />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`p-8 ${project.featured ? "lg:w-1/2" : ""} flex flex-col`}
                    >
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      {project.longDescription && (
                        <p className="text-slate-500 text-sm mb-4">
                          {project.longDescription}
                        </p>
                      )}

                      {project.metrics && (
                        <div className="flex flex-wrap gap-4 mb-6">
                          {project.metrics.map((metric, i) => (
                            <div
                              key={i}
                              className="px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-800"
                            >
                              <div className="text-lg font-bold text-emerald-400">
                                {metric.value}
                              </div>
                              <div className="text-xs text-slate-500">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map((tech) => (
                          <Badge key={tech} variant="tech">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center gap-4">
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                          >
                            <Github size={16} />
                            View Source
                            <ExternalLink size={12} />
                          </Link>
                        )}
                        <Link
                          href="#contact"
                          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium group/link"
                        >
                          Discuss Similar Project
                          <ArrowRight
                            size={14}
                            className="group-hover/link:translate-x-1 transition-transform"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <BlurFade delay={0.3}>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link
                href="https://github.com/ohboyftw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <Github size={20} />
                View All 23 Repositories on GitHub
                <ArrowUpRight size={16} />
              </Link>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
