import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ohboy Consultancy - Bridging Hardware, Software, and AI";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#020617",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #10B981, transparent)",
            display: "flex",
          }}
        />

        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "50%",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 70%)",
            transform: "translateX(-50%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            zIndex: 1,
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #10B981, #059669)",
              fontSize: "36px",
              fontWeight: 700,
              color: "#020617",
              letterSpacing: "-1px",
            }}
          >
            OB
          </div>

          {/* Company name */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#F8FAFC",
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            Ohboy Consultancy
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "#10B981",
              display: "flex",
            }}
          >
            Bridging Hardware, Software, and AI
          </div>

          {/* Separator */}
          <div
            style={{
              width: "120px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #10B981, transparent)",
              display: "flex",
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "#94A3B8",
              display: "flex",
            }}
          >
            Ship in weeks, not months. Battle-tested at Olympic scale.
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "16px",
            color: "#64748B",
          }}
        >
          <span>ohboyconsultancy.com</span>
          <span style={{ color: "#10B981" }}>|</span>
          <span>Dubai, UAE</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
