"use client";

import { Check } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/magicui/blur-fade";
import Link from "next/link";

const packages = [
  {
    name: "Discovery",
    tagline: "Get clarity on your challenge",
    price: "Free",
    priceDetail: "60 minutes",
    description:
      "Initial consultation to deep-dive into your technical challenge. Walk away with clarity on approach, potential pitfalls, and recommended next steps.",
    features: [
      "60-min technical deep-dive",
      "Feasibility assessment",
      "High-level architecture discussion",
      "Technology recommendations",
      "No commitment required",
    ],
    cta: "Book Free Session",
    ctaLink: "/book",
    featured: true,
  },
  {
    name: "Architecture Sprint",
    tagline: "Technical roadmap & design",
    price: "Contact",
    priceDetail: "1-2 weeks",
    description:
      "Intensive engagement for system design, architecture review, and technical roadmap. Ideal for startups pre-funding or companies at inflection points.",
    features: [
      "System architecture design",
      "Technology stack definition",
      "Architecture diagrams & docs",
      "Risk assessment",
      "Implementation roadmap",
    ],
    cta: "Get Quote",
    ctaLink: "#contact",
  },
  {
    name: "Embedded Partner",
    tagline: "Fractional CTO / Lead",
    price: "Retainer",
    priceDetail: "Monthly",
    description:
      "Ongoing fractional CTO or Lead Engineer engagement. Hands-on development, team mentorship, and technical strategy. Minimum 3-month commitment.",
    features: [
      "Weekly hands-on involvement",
      "Code reviews & mentorship",
      "Architecture decisions",
      "Strategic planning",
      "Team hiring support",
    ],
    cta: "Discuss",
    ctaLink: "#contact",
  },
  {
    name: "Project Build",
    tagline: "Full delivery",
    price: "Fixed",
    priceDetail: "Scope-based",
    description:
      "Fixed-scope product development. MVP builds, proof-of-concepts, or specific feature development. Includes requirements, design, implementation, and handoff.",
    features: [
      "Requirements gathering",
      "Design & implementation",
      "Testing & QA",
      "Documentation",
      "Handoff & training",
    ],
    cta: "Get Quote",
    ctaLink: "#contact",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-900/10 via-slate-950 to-slate-950" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <BlurFade>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-500 font-mono text-sm tracking-wider">
              {"/// ENGAGEMENT MODELS"}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
              Simple, Flexible{" "}
              <span className="text-gradient-emerald">Pricing</span>
            </h2>
            <p className="text-lg text-slate-400">
              Choose the engagement model that fits your needs. All packages
              emphasize value and outcomes over hours.
            </p>
          </div>
        </BlurFade>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <BlurFade key={i} delay={0.1 + i * 0.1}>
              <Card
                className={`relative h-full flex flex-col transition-all duration-500 ${
                  pkg.featured
                    ? "bg-gradient-to-b from-emerald-900/30 to-slate-900 border-2 border-emerald-500/50 shadow-2xl shadow-emerald-500/10 scale-[1.02] z-10"
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-emerald-500 text-slate-900 font-bold">
                      RECOMMENDED START
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-slate-500">{pkg.tagline}</p>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-white">
                      {pkg.price}
                    </div>
                    <div className="text-sm text-slate-500">
                      {pkg.priceDetail}
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  <ul className="space-y-3">
                    {pkg.features.map((feature, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <Check
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${
                            pkg.featured ? "text-emerald-400" : "text-slate-500"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    variant={pkg.featured ? "gradient" : "outline"}
                    className="w-full"
                    asChild
                  >
                    <Link href={pkg.ctaLink}>{pkg.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </BlurFade>
          ))}
        </div>

        {/* Bottom Note */}
        <BlurFade delay={0.5}>
          <p className="text-center text-sm text-slate-500 mt-12">
            All engagements begin with a free Discovery Session.
            <Link
              href="#contact"
              className="text-emerald-400 hover:text-emerald-300 ml-1"
            >
              Let&apos;s talk →
            </Link>
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
