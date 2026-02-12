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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://ohboyconsultancy.com/#business",
                  name: "Ohboy Consultancy FZ LLC",
                  url: "https://ohboyconsultancy.com",
                  logo: "https://ohboyconsultancy.com/icon",
                  description:
                    "Dubai-based technical consulting firm specializing in hardware, software, and AI solutions. Fractional CTO services, architecture design, embedded systems, and full-stack product development.",
                  founder: {
                    "@type": "Person",
                    name: "Aravind Vijayakumar",
                    jobTitle: "Founder & Principal Consultant",
                    url: "https://linkedin.com/in/aravindvijayakumar",
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Dubai",
                    addressCountry: "AE",
                  },
                  email: "aravind@ohboyconsultancy.com",
                  telephone: "+971585707124",
                  sameAs: [
                    "https://linkedin.com/in/aravindvijayakumar",
                    "https://github.com/ohboyftw",
                  ],
                  areaServed: ["AE", "US", "GB", "IN"],
                  priceRange: "$$",
                  knowsAbout: [
                    "Artificial Intelligence",
                    "Embedded Systems",
                    "Software Architecture",
                    "Full-Stack Development",
                    "Computer Vision",
                    "LLM Applications",
                    "IoT",
                    "Robotics",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://ohboyconsultancy.com/#website",
                  url: "https://ohboyconsultancy.com",
                  name: "Ohboy Consultancy",
                  publisher: {
                    "@id": "https://ohboyconsultancy.com/#business",
                  },
                },
                {
                  "@type": "Service",
                  name: "Technical Architecture & Consulting",
                  provider: {
                    "@id": "https://ohboyconsultancy.com/#business",
                  },
                  description:
                    "Fractional CTO services, system architecture design, technology stack evaluation, and technical roadmapping for startups and product companies.",
                  serviceType: "Technology Consulting",
                },
                {
                  "@type": "Service",
                  name: "AI/ML Solutions",
                  provider: {
                    "@id": "https://ohboyconsultancy.com/#business",
                  },
                  description:
                    "LLM application development, medical AI, computer vision, and custom AI/ML solutions.",
                  serviceType: "AI Consulting",
                },
                {
                  "@type": "Service",
                  name: "Full-Stack Product Development",
                  provider: {
                    "@id": "https://ohboyconsultancy.com/#business",
                  },
                  description:
                    "MVP to production development, web and mobile applications, API design, and scalable system implementation.",
                  serviceType: "Software Development",
                },
                {
                  "@type": "Service",
                  name: "Embedded Systems & Firmware",
                  provider: {
                    "@id": "https://ohboyconsultancy.com/#business",
                  },
                  description:
                    "IoT solutions, robotics, hardware-software integration, and firmware development. Battle-tested at Olympic scale.",
                  serviceType: "Embedded Systems Engineering",
                },
                {
                  "@type": "Offer",
                  name: "Discovery Session",
                  description:
                    "Free 60-minute technical consultation to assess your challenge, discuss architecture approaches, and recommend next steps.",
                  price: "0",
                  priceCurrency: "USD",
                  url: "https://ohboyconsultancy.com/book",
                  offeredBy: {
                    "@id": "https://ohboyconsultancy.com/#business",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${space.variable} ${jetbrains.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
