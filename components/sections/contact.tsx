"use client";

import { useState } from "react";
import {
  Mail,
  Smartphone,
  Linkedin,
  Github,
  Globe,
  ArrowUpRight,
  MessageSquare,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlurFade } from "@/components/magicui/blur-fade";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "aravind@ohboyconsultancy.com",
    link: "mailto:aravind@ohboyconsultancy.com",
  },
  {
    icon: Smartphone,
    label: "WhatsApp",
    value: "+971 585 707 124",
    link: "https://wa.me/971585707124",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "aravindvijayakumar",
    link: "https://linkedin.com/in/aravindvijayakumar",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "ohboyftw",
    link: "https://github.com/ohboyftw",
  },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = getSupabaseClient();

    // Fall back to mailto if Supabase is not configured
    if (!supabase) {
      const subject = encodeURIComponent(`Inquiry from ${formState.name}`);
      const body = encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
      );
      window.location.href = `mailto:aravind@ohboyconsultancy.com?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("submitting");

    const { error } = await supabase.from("contact_submissions").insert({
      name: formState.name,
      email: formState.email,
      message: formState.message,
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <div>
            <BlurFade>
              <span className="text-emerald-500 font-mono text-sm tracking-wider">
                {"/// LET'S CONNECT"}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-6">
                Let&apos;s Build Something{" "}
                <span className="text-gradient-emerald">Remarkable</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Whether you need to bridge hardware gaps, architect a scalable
                AI solution, or just need a second opinion on your stack —
                I&apos;m here. Every project starts with a conversation.
              </p>
            </BlurFade>

            {/* Contact Methods */}
            <BlurFade delay={0.1}>
              <div className="space-y-4 mb-8">
                {contactMethods.map((method, i) => (
                  <Link
                    key={i}
                    href={method.link}
                    target={
                      method.link.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      method.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 hover:bg-slate-900 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <method.icon size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-mono">
                        {method.label}
                      </div>
                      <div className="text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {method.value}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="ml-auto text-slate-500 group-hover:text-emerald-400 transition-colors"
                    />
                  </Link>
                ))}
              </div>
            </BlurFade>

            {/* Location */}
            <BlurFade delay={0.2}>
              <div className="flex items-center gap-3 text-slate-500">
                <Globe size={16} />
                <span className="text-sm">
                  Dubai, UAE &bull; Ohboy Consultancy FZ LLC
                </span>
              </div>
            </BlurFade>
          </div>

          {/* Right - Form */}
          <BlurFade delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />
              <Card className="relative bg-slate-900/80 border-slate-800 p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Send a Message
                  </h3>
                  <p className="text-sm text-slate-400">
                    I&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-mono text-slate-400"
                    >
                      Name
                    </label>
                    <Input
                      id="contact-name"
                      type="text"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="Your name"
                      required
                      disabled={status === "submitting"}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-mono text-slate-400"
                    >
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="you@company.com"
                      required
                      disabled={status === "submitting"}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-message"
                      className="text-sm font-mono text-slate-400"
                    >
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Tell me about your project or challenge..."
                      required
                      disabled={status === "submitting"}
                    />
                  </div>

                  {/* Status Messages */}
                  {status === "success" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
                      <CheckCircle2 size={16} className="shrink-0" />
                      <span>
                        Message sent! I&apos;ll get back to you within 24 hours.
                      </span>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>
                        Something went wrong. You can reach me directly at{" "}
                        <a
                          href="mailto:aravind@ohboyconsultancy.com"
                          className="underline hover:text-red-300"
                        >
                          aravind@ohboyconsultancy.com
                        </a>
                      </span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="gradient"
                    size="xl"
                    className="w-full"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <MessageSquare size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <span className="text-slate-500 text-sm">or</span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="xl"
                    className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    asChild
                  >
                    <Link
                      href="https://wa.me/971585707124?text=Hi%20Aravind%2C%20I%27d%20like%20to%20discuss%20a%20project"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Smartphone size={18} className="mr-2" />
                      Message on WhatsApp
                    </Link>
                  </Button>
                </form>
              </Card>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
