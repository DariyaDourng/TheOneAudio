"use client";

import React from "react";
// Make sure these match your project's Lucide setup
import { MapPin, Phone, Mail } from "lucide-react";

// Simple SVG placeholders for social icons if you aren't using lucide for them
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

export default function Footer() {
  return (
    <footer style={{ background: "rgba(247,243,238,0.02)", borderTop: "1px solid rgba(247,243,238,0.06)" }}>
      {/* Upper footer */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "clamp(2.5rem,6vw,4rem) clamp(1rem,4vw,2.5rem)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
        gap: "clamp(2rem,5vw,3.5rem)",
        borderBottom: "1px solid rgba(247,243,238,0.06)",
      }}>
        {/* Brand column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <svg width="28" height="28" viewBox="0 0 38 38" fill="none" aria-hidden="true">
              <circle cx="19" cy="19" r="17.5" stroke="#C8882A" strokeWidth="1.5" />
              <path d="M22 9.5L16 13.5V28.5H21V15.5L24.5 13L22 9.5Z" fill="#C8882A" />
            </svg>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(247,243,238,0.55)" }}>The One Audio</span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "rgba(247,243,238,0.3)", lineHeight: 1.8, fontWeight: 300, maxWidth: 220 }}>
            Curated high-fidelity audio for those who refuse to compromise.
          </p>
          {/* Social icons */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
            {[
              {
                href: "https://facebook.com",
                label: "Facebook",
                icon: <FacebookIcon />,
              },
              {
                href: "https://instagram.com",
                label: "Instagram",
                icon: <InstagramIcon />,
              },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 34, height: 34,
                  border: "1.5px solid rgba(247,243,238,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(247,243,238,0.35)",
                  textDecoration: "none",
                  transition: "border-color 0.2s, color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--amber)";
                  el.style.color = "var(--amber)";
                  el.style.background = "rgba(200,136,42,0.08)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(247,243,238,0.12)";
                  el.style.color = "rgba(247,243,238,0.35)";
                  el.style.background = "transparent";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation column */}
        <div>
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--amber)", fontWeight: 700, marginBottom: "1.2rem" }}>Explore</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {[["Collection", "/collection"], ["About", "/#about"], ["Philosophy", "/#philosophy"]].map(([label, href]) => (
              <li key={label}>
                <a href={href} style={{
                  fontSize: "0.78rem", color: "rgba(247,243,238,0.32)",
                  textDecoration: "none", fontWeight: 400, letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(247,243,238,0.75)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(247,243,238,0.32)")}
                >{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--amber)", fontWeight: 700, marginBottom: "1.2rem" }}>Contact</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {[
              { icon: <MapPin size={13} color="var(--amber)" />, text: "Phnom Penh, Cambodia" },
              { icon: <Phone  size={13} color="var(--amber)" />, text: "+855 12 345 678" },
              { icon: <Mail   size={13} color="var(--amber)" />, text: "hello@theoneaudio.com" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.78rem", color: "rgba(247,243,238,0.32)", fontWeight: 400 }}>
                {icon}
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower footer */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "1.25rem clamp(1rem,4vw,2.5rem)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem",
      }}>
        <span style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(247,243,238,0.18)", textTransform: "uppercase" }}>© 2019–2026 The One Audio. All rights reserved.</span>
        <span style={{ fontSize: "0.58rem", letterSpacing: "0.16em", color: "rgba(200,136,42,0.25)", textTransform: "uppercase" }}>High-Fidelity Audio · Phnom Penh</span>
      </div>
    </footer>
  );
}