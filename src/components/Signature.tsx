"use client";
import { useState } from "react";
export function Signature() {
  const [mode, setMode] = useState<"systems" | "stories">("systems");
  return (
    <div className={`signature ${mode}`}>
      <div className="signature-top">
        <span className="eyebrow">Two perspectives. One practice.</span>
        <span className="crosshair" aria-hidden="true">
          +
        </span>
      </div>
      <div
        className="mode-switch"
        role="group"
        aria-label="Explore the systems and stories perspectives"
      >
        <button
          aria-pressed={mode === "systems"}
          onClick={() => setMode("systems")}
        >
          01 / Systems
        </button>
        <button
          aria-pressed={mode === "stories"}
          onClick={() => setMode("stories")}
        >
          02 / Stories
        </button>
      </div>
      <svg
        className="signal-art"
        viewBox="0 0 440 360"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="signal-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".7" fill="currentColor" opacity=".24" />
          </pattern>
        </defs>
        <rect width="440" height="360" fill="url(#signal-grid)" />
        <path
          className="orbit"
          d="M220 26a154 154 0 1 1-.1 0"
          stroke="currentColor"
          strokeOpacity=".16"
        />
        <path
          d="M20 180h400M220 0v360"
          stroke="currentColor"
          strokeOpacity=".1"
        />
        <g className="systems-lines" stroke="currentColor" strokeWidth="1.1">
          <path d="M70 90h95l55 90 65-90h85M70 270h95l55-90 65 90h85M70 90v180M370 90v180" />
          <path
            d="M70 90 220 180 70 270M370 90 220 180 370 270"
            strokeDasharray="3 6"
            opacity=".4"
          />
        </g>
        <g className="frame-lines" stroke="currentColor">
          <rect x="62" y="75" width="316" height="210" rx="3" />
          <path d="M62 100h316M62 260h316" />
          {[80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
            <g key={x}>
              <rect x={x} y="83" width="9" height="10" rx="1" />
              <rect x={x} y="267" width="9" height="10" rx="1" />
            </g>
          ))}
          <path d="M205 147 253 180 205 213Z" fill="currentColor" />
        </g>
        <g className="signal-node node-a">
          <rect x="50" y="70" width="40" height="40" rx="6" />
          <path d="M63 90h14m-7-7v14" />
        </g>
        <g className="signal-node node-b">
          <rect x="350" y="70" width="40" height="40" rx="6" />
          <path d="M363 90h14m-7-7v14" />
        </g>
        <g className="signal-node node-c">
          <rect x="50" y="250" width="40" height="40" rx="6" />
          <path d="M63 270h14m-7-7v14" />
        </g>
        <g className="signal-node node-d">
          <rect x="350" y="250" width="40" height="40" rx="6" />
          <path d="M363 270h14m-7-7v14" />
        </g>
        <g className="core">
          <rect x="191" y="151" width="58" height="58" rx="12" />
          <path d="m211 169-10 11 10 11m18-22 10 11-10 11m-6-24-6 28" />
        </g>
        <circle
          className="orbit-marker"
          cx="220"
          cy="26"
          r="4"
          fill="var(--coral)"
        />
      </svg>
      <div className="signature-caption" aria-live="polite">
        <span className="status-dot" />
        {mode === "systems"
          ? "Logic. Structure. Connection."
          : "Concept. Generation. Edit."}
        <span aria-hidden="true">
          {mode === "systems" ? "[ S × S ]" : "[ ▶ REC ]"}
        </span>
      </div>
    </div>
  );
}
