"use client";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { DEMO_PRODUCTS, CATEGORIES } from "@/lib/products";
import { ArrowRight, MapPin, Phone, Mail, Star, Shield, Headphones } from "lucide-react";
import Footer from "@/components/Footer";

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const MARQUEE = ["High-Fidelity Audio","Phnom Penh","Est. 2019","Amplifiers","Turntables","Loudspeakers","Headphones","DAC & Streamers","Phono Stages","Cables"];

export default function Page() {
  const featured = DEMO_PRODUCTS.slice(0, 3);

  return (
    <div style={{ 
      background: "var(--bg)", 
      fontFamily: "'Montserrat', sans-serif", 
      textAlign: "left",
      color: "rgba(247,243,238,0.9)"
    }}>
      {/* Global Styles for Typography and Navbar Opacity */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Montserrat', sans-serif !important;
        }

        h1, h2, h3, strong {
          font-weight: 700 !important;
        }

        p, span, a {
          font-weight: 500 !important;
        }

        /* Target the Nav/Header to make it less transparent */
        nav, header, .nav-container {
          background-color: rgba(10, 9, 8, 0.95) !important;
          backdrop-filter: blur(10px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
        }
      `}</style>
      
      <Nav />

      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", minHeight: "90vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1619983081563-430f63602796?w=1600&auto=format&fit=crop&q=80"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.7) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)",
        }} />

        <div style={{
          position: "relative", zIndex: 2,
          width: "100%", maxWidth: 1200, margin: "0 auto",
          padding: "clamp(4rem,10vw,8rem) clamp(1rem,4vw,2.5rem)",
        }}>
          <div style={{ maxWidth: "600px", animation: "fadein 0.9s ease both" }}>
            <p style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              fontSize: "0.55rem", letterSpacing: "0.25em",
              textTransform: "uppercase", color: "var(--amber)",
              marginBottom: "1.2rem",
            }}>
              <span style={{ width: "1.5rem", height: "1px", background: "var(--amber)", display: "block" }} />
              Phnom Penh · Est. 2019
            </p>

            <h1 style={{
              lineHeight: 1.1,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "#fff", marginBottom: "1.2rem",
              letterSpacing: "-0.02em",
            }}>
              Sound that{" "}
              <span style={{ color: "var(--amber)" }}>moves</span>
              <br />the soul
            </h1>

            <p style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.7)", lineHeight: 1.7,
              marginBottom: "2rem", maxWidth: 400,
              fontWeight: 400
            }}>
              Hand-selected audio equipment for those who refuse to compromise.
              Curated by audiophiles in Phnom Penh since 2019.
            </p>

            <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/collection" style={{
                background: "var(--amber)", color: "#fff",
                textDecoration: "none", fontSize: "0.65rem",
                letterSpacing: "0.15em", textTransform: "uppercase",
                padding: "0.9rem 1.8rem",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                transition: "all 0.2s",
                fontWeight: 700
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--amber-dk)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--amber)")}
              >Explore Collection</Link>

              <a href="#about" style={{
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none", fontSize: "0.65rem",
                letterSpacing: "0.15em", textTransform: "uppercase",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                transition: "color 0.2s",
                fontWeight: 600
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              >Our Story <ArrowRight size={14} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div aria-hidden="true" style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "0.6rem 0", overflow: "hidden",
        background: "rgba(255,255,255,0.01)",
      }}>
        <div style={{ display: "flex", gap: "2rem", animation: "marquee 30s linear infinite", whiteSpace: "nowrap" }}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} style={{
              fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--amber)", flexShrink: 0,
              display: "inline-flex", alignItems: "center", gap: "2rem",
              fontWeight: 600
            }}>
              {item}
              <span style={{ color: "rgba(200,136,42,0.2)" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ FEATURED ═══ */}
      <section id="collection" style={{ padding: "4rem clamp(1rem,4vw,2.5rem)", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "0.5rem" }}>Featured Collection</p>
            <h2 style={{ fontSize: "1.8rem", color: "#fff", lineHeight: 1.2 }}>Curated for the discerning ear</h2>
          </div>
          <Link href="/collection" style={{
            fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--amber)", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            borderBottom: "1px solid var(--amber)", paddingBottom: "2px",
            whiteSpace: "nowrap",
            fontWeight: 700
          }}>View All <ArrowRight size={12} /></Link>
        </div>

        {/* Category pills */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {CATEGORIES.filter(c => c !== "All").map(cat => (
            <Link key={cat} href={`/collection?category=${encodeURIComponent(cat)}`} style={{
              fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.4rem 0.8rem",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.5)",
              textDecoration: "none", transition: "all 0.2s",
              whiteSpace: "nowrap",
              fontWeight: 600
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "var(--amber)"; el.style.color = "var(--amber)"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = "rgba(255,255,255,0.5)"; }}
            >{cat}</Link>
          ))}
        </div>

        {/* 3-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: "1.5rem" }}>
          {featured.map(p => (
            <Link key={p._id} href={`/product/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <article style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden", transition: "all 0.3s" }}>
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <img src={`${p.imageUrl}?w=600&auto=format&fit=crop&q=80`} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  {p.badge && (
                    <span style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "var(--amber)", color: "#fff", fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, padding: "0.25rem 0.5rem" }}>{p.badge}</span>
                  )}
                </div>
                <div style={{ padding: "1.2rem" }}>
                  <p style={{ fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "0.3rem" }}>{p.category}</p>
                  <h3 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: "0.8rem", lineHeight: 1.3 }}>{p.title}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.8rem" }}>
                    <span style={{ fontSize: "0.8rem", color: "#fff", fontWeight: 700 }}>{p.priceText}</span>
                    <span style={{ fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)", display: "inline-flex", alignItems: "center", gap: "0.3rem", fontWeight: 700 }}>View <ArrowRight size={11} /></span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <div id="about" style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "5rem clamp(1rem,4vw,2.5rem)",
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
          gap: "4rem", alignItems: "center",
        }}>
          <div style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80" alt="About" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", top: -8, left: -8, width: 40, height: 40, borderTop: "2px solid var(--amber)", borderLeft: "2px solid var(--amber)" }} />
            <div style={{ position: "absolute", bottom: -8, right: -8, width: 40, height: 40, borderBottom: "2px solid var(--amber)", borderRight: "2px solid var(--amber)" }} />
          </div>
          <div>
            <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "0.8rem" }}>About Us</p>
            <h2 style={{ fontSize: "1.8rem", color: "#fff", lineHeight: 1.2, marginBottom: "1.2rem" }}>Born from a passion for pure sound</h2>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Founded in Phnom Penh in 2019, The One Audio was built on a single conviction: that exceptional sound is a right.
            </p>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "2rem" }}>
              Every product is personally auditioned against the most exacting criteria — from technical specification to the quality that makes music feel alive.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
              {[["6+","Years"],["200+","Items"],["40+","Brands"]].map(([n,l]) => (
                <div key={l}>
                  <strong style={{ display: "block", fontSize: "1.8rem", color: "#fff" }}>{n}</strong>
                  <span style={{ fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ PHILOSOPHY ═══ */}
      <section id="philosophy" style={{ padding: "5rem clamp(1rem,4vw,2.5rem)", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "0.5rem" }}>Philosophy</p>
        <h2 style={{ fontSize: "1.8rem", color: "#fff", lineHeight: 1.2, marginBottom: "2.5rem" }}>Three principles that define us</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: "1.5rem" }}>
          {[
            { icon: <Shield size={18} color="var(--amber)" />, num: "I",   title: "Honesty of Sound",    body: "Great audio reveals music as intended — uncoloured and fully present." },
            { icon: <Star   size={18} color="var(--amber)" />, num: "II",  title: "Longevity Over Trend", body: "We select equipment built to endure decades. Solid engineering is a prerequisite." },
            { icon: <Headphones size={18} color="var(--amber)" />, num: "III", title: "Expert Partnership", body: "Every customer receives attentive support and honest recommendations." },
          ].map(item => (
            <div key={item.num} style={{ padding: "2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ marginBottom: "0.8rem" }}>{item.icon}</div>
              <h3 style={{ fontSize: "1rem", color: "#fff", marginBottom: "0.5rem" }}>{item.title}</h3>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}
