"use client";

import React, { useId } from "react";

interface LogoProps {
  size?: number;
  className?: string;
  showBackground?: boolean;
  animate?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 32,
  className = "",
  showBackground = false,
  animate = true,
}) => {
  const uniqueId = useId();
  const glowId = `glow-${uniqueId}`;
  const gradientId = `gradient-${uniqueId}`;

  const primaryColor = "#10B981"; // Emerald Green
  const bgColor = "#020617"; // Deep Slate
  const accentColor = "#22D3EE"; // Cyan Glow

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ohboy Consultancy Logo"
    >
      <defs>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Background Container (App Icon Style) */}
      {showBackground && (
        <rect width="512" height="512" rx="112" fill={bgColor} />
      )}

      {/* Core "O" Symbolism via Brackets and Cursor */}
      <g transform="translate(106, 106)">
        {/* Left Bracket Element */}
        <path
          d="M100 60 L40 150 L100 240"
          stroke={primaryColor}
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
        />

        {/* Right Bracket Element */}
        <path
          d="M200 60 L260 150 L200 240"
          stroke={primaryColor}
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
        />

        {/* Top and Bottom Circuit Connection Arcs to form the "O" */}
        <path
          d="M130 50 Q150 40 170 50"
          stroke={primaryColor}
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M130 250 Q150 260 170 250"
          stroke={primaryColor}
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Central Terminal Cursor Symbol (_) */}
        <rect
          x="125"
          y="180"
          width="50"
          height="14"
          fill={accentColor}
          filter={`url(#${glowId})`}
        >
          {animate && (
            <animate
              attributeName="opacity"
              values="1;0;1"
              dur="1.5s"
              repeatCount="indefinite"
            />
          )}
        </rect>

        {/* Circuit Nodes (Dots) */}
        <circle cx="40" cy="150" r="12" fill={primaryColor} />
        <circle cx="260" cy="150" r="12" fill={primaryColor} />
        <circle cx="150" cy="50" r="8" fill={primaryColor} opacity="0.4" />

        {/* Subtle Trace Lines */}
        <path
          d="M40 150 L100 150 M260 150 L200 150"
          stroke={primaryColor}
          strokeWidth="4"
          opacity="0.3"
        />
      </g>
    </svg>
  );
};

export default Logo;
