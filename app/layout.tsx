import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ohboyconsultancy.com"),
  title: {
    default: "Ohboy Consultancy | Bridging Hardware, Software, and AI",
    template: "%s | Ohboy Consultancy",
  },
  description:
    "One senior engineer delivering what typically requires 3 specialists. Ship in weeks, not months. Fractional CTO expertise for product companies. Battle-tested at Olympic scale.",
  keywords: [
    "technical consulting",
    "AI consulting",
    "embedded systems",
    "software architecture",
    "Dubai",
    "fractional CTO",
    "LLM development",
    "full-stack development",
    "startup consulting",
  ],
  authors: [{ name: "Aravind Vijayakumar" }],
  creator: "Ohboy Consultancy FZ LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ohboyconsultancy.com",
    siteName: "Ohboy Consultancy",
    title: "Ohboy Consultancy | Bridging Hardware, Software, and AI",
    description:
      "One senior engineer delivering what typically requires 3 specialists. Ship in weeks, not months. Battle-tested at Olympic scale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ohboy Consultancy | Bridging Hardware, Software, and AI",
    description:
      "One senior engineer delivering what typically requires 3 specialists. Ship in weeks, not months.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jakarta.variable} ${space.variable} ${jetbrains.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
