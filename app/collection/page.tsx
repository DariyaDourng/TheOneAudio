"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { DEMO_PRODUCTS, CATEGORIES } from "@/lib/products";
import { ArrowRight, SlidersHorizontal, X } from "lucide-react";

export default function CollectionPage() {
  const [active, setActive] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat && CATEGORIES.includes(cat)) setActive(cat);
  }, []);

  const filtered = active === "All" ? DEMO_PRODUCTS : DEMO_PRODUCTS.filter(p => p.category === active);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />

      {/* Page header */}
      <div style={{ background: "rgba(247,243,238,0.02)", borderBottom: "1px solid rgba(247,243,238,0.06)", paddingTop: "clamp(72px,12vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(2rem,5vw,3.5rem) clamp(1rem,4vw,2.5rem)" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(247,243,238,0.3)", fontWeight: 500, marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "rgba(247,243,238,0.3)", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 0.5rem", color: "rgba(247,243,238,0.15)" }}>›</span>
            <span style={{ color: "var(--amber)" }}>Collection</span>
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem,5vw,3.5rem)", color: "rgba(247,243,238,0.92)", lineHeight: 1.1, marginBottom: "0.5rem" }}>
            Our Collection
          </h1>
          <p style={{ fontSize: "0.85rem", color: "rgba(247,243,238,0.35)", fontWeight: 400 }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}{active !== "All" ? ` in ${active}` : ""}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(2rem,5vw,3rem) clamp(1rem,4vw,2.5rem)" }}>
        <div style={{ display: "flex", gap: "clamp(1.5rem,4vw,3rem)", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* ── SIDEBAR (desktop) ── */}
          <aside style={{ width: "clamp(160px,18vw,200px)", flexShrink: 0 }} className="filter-sidebar">
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(247,243,238,0.3)", fontWeight: 700, marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(247,243,238,0.06)" }}>Filter by Category</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button onClick={() => setActive(cat)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    width: "100%", textAlign: "left",
                    background: active === cat ? "rgba(200,136,42,0.1)" : "transparent",
                    border: active === cat ? "1.5px solid var(--amber)" : "1.5px solid transparent",
                    color: active === cat ? "var(--amber)" : "rgba(247,243,238,0.4)",
                    padding: "0.6rem 0.75rem",
                    fontSize: "0.7rem", letterSpacing: "0.08em", fontWeight: active === cat ? 700 : 400,
                    cursor: "pointer", transition: "all 0.18s",
                    textTransform: "uppercase",
                  }}
                    onMouseEnter={e => { if (active !== cat) { e.currentTarget.style.color = "rgba(247,243,238,0.75)"; e.currentTarget.style.borderColor = "rgba(247,243,238,0.12)"; } }}
                    onMouseLeave={e => { if (active !== cat) { e.currentTarget.style.color = "rgba(247,243,238,0.4)"; e.currentTarget.style.borderColor = "transparent"; } }}
                  >
                    <span>{cat}</span>
                    <span style={{ fontSize: "0.6rem", color: active === cat ? "var(--amber)" : "rgba(247,243,238,0.2)", fontWeight: 400 }}>
                      {cat === "All" ? DEMO_PRODUCTS.length : DEMO_PRODUCTS.filter(p => p.category === cat).length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* ── MOBILE filter bar ── */}
          <div className="filter-mobile" style={{ display: "none", width: "100%" }}>
            <button onClick={() => setShowFilter(!showFilter)} style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(247,243,238,0.03)", border: "1.5px solid rgba(247,243,238,0.1)",
              padding: "0.65rem 1rem", fontSize: "0.68rem", letterSpacing: "0.12em",
              textTransform: "uppercase", fontWeight: 600, color: "rgba(247,243,238,0.6)", cursor: "pointer",
              marginBottom: "0.75rem",
            }}>
              <SlidersHorizontal size={14} />
              Filter: {active}
              {active !== "All" && <X size={12} onClick={e => { e.stopPropagation(); setActive("All"); }} />}
            </button>
            {showFilter && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem", animation: "slidedown 0.2s ease" }}>
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => { setActive(cat); setShowFilter(false); }} style={{
                    background: active === cat ? "var(--amber)" : "rgba(247,243,238,0.03)",
                    border: `1.5px solid ${active === cat ? "var(--amber)" : "rgba(247,243,238,0.1)"}`,
                    color: active === cat ? "#fff" : "rgba(247,243,238,0.45)",
                    padding: "0.4rem 0.85rem", fontSize: "0.62rem",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    fontWeight: 600, cursor: "pointer",
                  }}>{cat}</button>
                ))}
              </div>
            )}
          </div>

          {/* ── PRODUCT GRID ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {active !== "All" && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.68rem", color: "rgba(247,243,238,0.3)", fontWeight: 400 }}>Showing:</span>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  background: "rgba(200,136,42,0.1)", border: "1px solid var(--amber)",
                  color: "var(--amber)", padding: "0.3rem 0.75rem",
                  fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700,
                }}>
                  {active}
                  <button onClick={() => setActive("All")} style={{ background: "none", border: "none", color: "var(--amber)", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
                    <X size={11} />
                  </button>
                </span>
              </div>
            )}

            {filtered.length === 0 ? (
              <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "rgba(247,243,238,0.3)", fontWeight: 300 }}>No products in this category yet.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,240px),1fr))", gap: "clamp(0.85rem,2.5vw,1.5rem)" }}>
                {filtered.map(p => (
                  <Link key={p._id} href={`/product/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <article
                      style={{ background: "rgba(247,243,238,0.03)", border: "1px solid rgba(247,243,238,0.08)", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", transition: "box-shadow 0.25s, transform 0.25s, border-color 0.25s" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 12px 48px rgba(0,0,0,0.5)"; el.style.transform = "translateY(-4px)"; el.style.borderColor = "rgba(200,136,42,0.35)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; el.style.borderColor = "rgba(247,243,238,0.08)"; }}
                    >
                      <div style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden", background: "rgba(247,243,238,0.05)", flexShrink: 0 }}>
                        <img
                          src={`${p.imageUrl}?w=500&auto=format&fit=crop&q=80`} alt={p.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                        />
                        {p.badge && (
                          <span style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "var(--amber)", color: "#fff", fontSize: "0.52rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, padding: "0.25rem 0.55rem" }}>{p.badge}</span>
                        )}
                      </div>
                      <div style={{ padding: "clamp(0.85rem,2.5vw,1.2rem)", flex: 1, display: "flex", flexDirection: "column" }}>
                        <p style={{ fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)", fontWeight: 700, marginBottom: "0.3rem" }}>{p.category}</p>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem,2.5vw,1.2rem)", fontWeight: 400, color: "rgba(247,243,238,0.9)", lineHeight: 1.3, marginBottom: "auto", paddingBottom: "0.75rem" }}>{p.title}</h3>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(247,243,238,0.07)", paddingTop: "0.7rem" }}>
                          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "rgba(247,243,238,0.9)" }}>{p.priceText}</span>
                          <span style={{ fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--amber)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>View <ArrowRight size={10} /></span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .filter-sidebar { display: none !important; }
          .filter-mobile  { display: block !important; }
        }
      `}</style>
    </div>
  );
}