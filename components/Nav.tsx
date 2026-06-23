"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Collection", href: "/collection" },
    { label: "About",      href: "/#about" },
    { label: "Philosophy", href: "/#philosophy" },
    { label: "Contact",    href: "/#footer" },
  ];

  // Explicitly typed 'e' as a React MouseEvent for HTML anchor elements
  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setOpen(false); // Close mobile tray
      }
    }
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(10,9,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(247,243,238,0.07)" : "transparent"}`,
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 clamp(1rem, 4vw, 2.5rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "clamp(60px, 8vw, 72px)",
        }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.65rem", textDecoration: "none" }}>
            <img src="../images/TheOneAudio.png" alt="The One Audio Logo" style={{ height: "50px", width: "auto", borderRadius: "50%" }} />
            <div>
              <span style={{
                display: "block",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600, fontSize: "clamp(0.85rem, 2vw, 1rem)",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(247,243,238,0.92)",
              }}>The One Audio</span>
              <span style={{
                display: "block", fontSize: "0.5rem", letterSpacing: "0.2em",
                textTransform: "uppercase", color: "rgba(247,243,238,0.35)", fontWeight: 400,
              }}>Est. 2019 · Phnom Penh</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul style={{ display: "flex", gap: "2rem", listStyle: "none", alignItems: "center" }} className="desktop-nav">
            {links.map(l => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={(e) => handleScrollLink(e, l.href)}
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "rgba(247,243,238,0.6)",
                    textDecoration: "none",
                    transition: "color 0.25s",
                    padding: "4px 0",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#D4924A")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(247,243,238,0.6)")}
                >{l.label}</Link>
              </li>
            ))}
            <li>
              {/* Enquire Button - Routed directly to Messenger */}
              <a 
                href="https://m.me/theoneaudioca" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleScrollLink(e, "https://m.me/theoneaudioca")}
                style={{
                  fontSize: "0.65rem", letterSpacing: "0.14em",
                  textTransform: "uppercase", fontWeight: 600,
                  color: "var(--amber)",
                  border: "1px solid var(--amber)",
                  textDecoration: "none", padding: "0.5rem 1.3rem",
                  display: "inline-block",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--amber)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--amber)"; }}
              >Enquire</a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="mobile-menu-btn"
            style={{
              background: "none", border: "none",
              color: "rgba(247,243,238,0.85)", padding: "0.4rem",
              display: "none", alignItems: "center", justifyContent: "center",
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div style={{
            background: "rgba(10,9,8,0.97)",
            borderTop: "1px solid rgba(247,243,238,0.07)",
            padding: "1.25rem clamp(1rem, 4vw, 2.5rem) 1.5rem",
            animation: "slidedown 0.2s ease",
          }} className="mobile-nav">
            {links.map(l => (
              <Link key={l.label} href={l.href}
                onClick={(e) => handleScrollLink(e, l.href)}
                style={{
                  display: "block", padding: "0.75rem 0",
                  fontSize: "0.72rem", letterSpacing: "0.18em",
                  textTransform: "uppercase", fontWeight: 500,
                  color: "rgba(247,243,238,0.6)", textDecoration: "none",
                  borderBottom: "1px solid rgba(247,243,238,0.07)",
                  transition: "color 0.25s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#D4924A")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(247,243,238,0.6)")}
              >{l.label}</Link>
            ))}
            {/* Mobile Enquire Button - Routed directly to Messenger */}
            <a 
              href="https://m.me/theoneaudioca" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                setOpen(false);
                handleScrollLink(e, "https://m.me/theoneaudioca");
              }} 
              style={{
                display: "block", marginTop: "1rem",
                border: "1px solid var(--amber)", color: "var(--amber)",
                textDecoration: "none", padding: "0.85rem",
                fontSize: "0.7rem", letterSpacing: "0.16em",
                textTransform: "uppercase", fontWeight: 600,
                textAlign: "center",
              }}
            >Enquire Now</a>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}