import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { BookingFlow } from "@/components/booking/booking-flow";
import { BlurFade } from "@/components/magicui/blur-fade";

export const metadata: Metadata = {
  title: "Book a Discovery Session",
  description:
    "Book a free 60-minute Discovery Session with Aravind Vijayakumar. Get clarity on your technical challenge, architecture approach, and recommended next steps.",
};

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <BlurFade>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-emerald-500 font-mono text-sm tracking-wider">
                {"/// DISCOVERY SESSION"}
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
                Book a{" "}
                <span className="text-gradient-emerald">Free Session</span>
              </h1>
              <p className="text-lg text-slate-400">
                60 minutes to deep-dive into your technical challenge.
                Walk away with clarity on approach, potential pitfalls,
                and recommended next steps.
              </p>
            </div>
          </BlurFade>

          {/* Booking Flow */}
          <BookingFlow />
        </div>
      </main>
      <Footer />
    </div>
  );
}
