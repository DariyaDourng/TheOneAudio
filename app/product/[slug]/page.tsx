import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ProductGallery } from "@/components/ProductGallery";
import { DEMO_PRODUCTS } from "@/lib/products";
import { ArrowLeft, ArrowRight, MapPin, CheckCircle, Package, Shield, Phone } from "lucide-react";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return DEMO_PRODUCTS.map(p => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = DEMO_PRODUCTS.find(p => p.slug === slug);
  if (!product) return notFound();

  const related = DEMO_PRODUCTS.filter(p => p.category === product.category && p._id !== product._id).slice(0, 3);
  const images = product.galleryUrls?.length ? product.galleryUrls : [product.imageUrl];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ height: "clamp(60px,8vw,72px)" }} />

      {/* ── BREADCRUMB ── */}
      <div style={{ background: "var(--bg-alt)", borderBottom: "1px solid var(--border)", padding: "0.85rem clamp(1rem,4vw,2.5rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--stone)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" as const }}>
            <Link href="/" style={{ color: "var(--stone)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "var(--border)" }}>›</span>
            <Link href="/collection" style={{ color: "var(--stone)", textDecoration: "none" }}>Collection</Link>
            <span style={{ color: "var(--border)" }}>›</span>
            <Link href={`/collection?category=${encodeURIComponent(product.category)}`} style={{ color: "var(--stone)", textDecoration: "none" }}>{product.category}</Link>
            <span style={{ color: "var(--border)" }}>›</span>
            <span style={{ color: "var(--amber)" }}>{product.title}</span>
          </p>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(2rem,5vw,4rem) clamp(1rem,4vw,2.5rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "clamp(2rem,6vw,5rem)", alignItems: "start" }}>

          {/* ── GALLERY (client component) ── */}
          <ProductGallery images={images} title={product.title} badge={product.badge} />

          {/* ── PRODUCT INFO ── */}
          <div style={{ position: "sticky", top: "clamp(72px,10vw,90px)" }}>

            {/* Category + Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" as const }}>
              <Link href={`/collection?category=${encodeURIComponent(product.category)}`} style={{
                fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase" as const,
                color: "#fff", background: "var(--amber)",
                fontWeight: 700, padding: "0.28rem 0.65rem", textDecoration: "none",
              }}>{product.category}</Link>
              {product.brand && (
                <span style={{ fontSize: "0.65rem", color: "var(--stone)", fontWeight: 400 }}>by {product.brand}</span>
              )}
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(1.8rem,4.5vw,2.8rem)", color: "var(--ink)",
              lineHeight: 1.1, marginBottom: "0.85rem",
            }}>{product.title}</h1>

            {/* Price */}
            <p style={{ fontSize: "clamp(1.4rem,3.5vw,1.9rem)", fontWeight: 700, color: "var(--amber)", marginBottom: "1.25rem" }}>
              {product.priceText}
            </p>

            {/* Description */}
            <p style={{ fontSize: "clamp(0.8rem,2vw,0.88rem)", color: "var(--stone)", lineHeight: 1.9, fontWeight: 400, marginBottom: "1.5rem" }}>
              {product.description}
            </p>

            {/* Meta tags */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const, marginBottom: "1.5rem" }}>
              {[
                // { icon: <MapPin size={12} />, label: product.origin || "International" },
                // { icon: <Shield size={12} />, label: `${product.warranty || "1 Year"} Warranty` },
                // { icon: <Package size={12} />, label: "Free Shipping" },
              ].map(({ icon, label }) => (
                <span key={label} style={{
                  display: "inline-flex", alignItems: "center", gap: "0.35rem",
                  fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase" as const, color: "var(--stone)",
                  background: "var(--bg-alt)", border: "1px solid var(--border)",
                  padding: "0.35rem 0.75rem",
                }}>{icon}{label}</span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem", marginBottom: "1.75rem" }}>
              <a href="#enquire" style={{
                background: "var(--amber)", color: "#fff",
                textDecoration: "none", textAlign: "center" as const,
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase" as const, padding: "1.05rem 2rem",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              }}>Enquire About This Product <ArrowRight size={14} /></a>
              <a href="tel:+85512345678" style={{
                background: "#fff", color: "var(--ink)",
                textDecoration: "none", textAlign: "center" as const,
                fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em",
                textTransform: "uppercase" as const, padding: "1.05rem 2rem",
                border: "1.5px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              }}><Phone size={13} /> Call for Advice</a>
            </div>

            {/* Trust points */}
            {/* <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.5rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }}>
              {["Personally auditioned by our team", "Authenticity guaranteed", "Showroom available by appointment"].map(t => (
                <p key={t} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.72rem", color: "var(--stone)", fontWeight: 400 }}>
                  <CheckCircle size={13} color="var(--amber)" />{t}
                </p>
              ))}
            </div> */}
          </div>
        </div>

        {/* ── SPECS ── */}
        {/* <div style={{ marginTop: "clamp(2.5rem,6vw,4rem)", paddingTop: "clamp(2rem,5vw,3rem)", borderTop: "1px solid var(--border)" }}> */}
          {/* <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.5rem,3.5vw,2.2rem)", color: "var(--ink)", marginBottom: "1.75rem" }}>
            Technical Specifications
          </h2> */}
          {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))", gap: "1px", background: "var(--border)" }}>
            {product.specs.map((spec, i) => {
              const colonIdx = spec.indexOf("·");
              const parts = colonIdx > -1 ? [spec.slice(0, colonIdx).trim(), spec.slice(colonIdx + 1).trim()] : [spec];
              return (
                <div key={i} style={{ background: i % 2 === 0 ? "#fff" : "var(--bg-alt)", padding: "1.1rem 1.4rem" }}>
                  <p style={{ fontSize: "0.85rem", color: "var(--ink)", fontWeight: 500 }}>{parts[0]}</p>
                  {parts[1] && <p style={{ fontSize: "0.78rem", color: "var(--stone)", marginTop: "0.2rem", fontWeight: 300 }}>{parts[1]}</p>}
                </div>
              );
            })}
          </div> */}
        {/* </div> */}

        {/* ── ENQUIRE FORM ── */}
        {/* <div id="enquire" style={{ marginTop: "clamp(2.5rem,6vw,4rem)", paddingTop: "clamp(2rem,5vw,3rem)", borderTop: "1px solid var(--border)" }}> */}
          {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "clamp(2rem,5vw,4rem)", alignItems: "start" }}> */}
            {/* <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.5rem,3.5vw,2.2rem)", color: "var(--ink)", marginBottom: "0.75rem" }}>
                Interested in this product?
              </h2>
              <p style={{ fontSize: "0.85rem", color: "var(--stone)", lineHeight: 1.8, fontWeight: 400, marginBottom: "1.5rem" }}>
                Our team is on hand to answer questions, arrange a listening session, or discuss how this fits your system.
              </p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.85rem" }}>
                {[
                  { icon: <Phone size={14} />, text: "+855 12 345 678" },
                  { icon: <MapPin size={14} />, text: "Phnom Penh Showroom (by appt.)" },
                ].map(({ icon, text }) => (
                  <p key={text} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.82rem", color: "var(--stone)", fontWeight: 400 }}>
                    <span style={{ color: "var(--amber)" }}>{icon}</span>{text}
                  </p>
                ))}
              </div>
            </div> */}
            {/* <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
              <div style={{ background: "var(--amber-pale)", border: "1.5px solid var(--amber)", padding: "0.85rem 1rem" }}>
                <p style={{ fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--amber)", fontWeight: 700, marginBottom: "0.2rem" }}>Enquiring about</p>
                <p style={{ fontSize: "0.88rem", color: "var(--amber-dk)", fontWeight: 600 }}>{product.title}</p>
              </div>
              {["Your Name", "Email Address", "Phone Number"].map(ph => (
                <input key={ph} type="text" placeholder={ph} style={{ background: "#fff", border: "1.5px solid var(--border)", color: "var(--ink)", padding: "0.85rem 1rem", fontSize: "0.82rem", fontFamily: "inherit", width: "100%" }} />
              ))}
              <textarea placeholder="Any questions or specific requirements?" rows={3} style={{ background: "#fff", border: "1.5px solid var(--border)", color: "var(--ink)", padding: "0.85rem 1rem", fontSize: "0.82rem", fontFamily: "inherit", width: "100%", resize: "vertical" }} />
              <button type="button" style={{ background: "var(--amber)", color: "#fff", border: "none", padding: "1rem", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, cursor: "pointer", width: "100%" }}>
                Send Enquiry
              </button>
            </div> */}
          {/* </div>
        </div> */}

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <div style={{ marginTop: "clamp(2.5rem,6vw,4rem)", paddingTop: "clamp(2rem,5vw,3rem)", borderTop: "1px solid var(--border)" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.5rem,3.5vw,2.2rem)", color: "var(--ink)", marginBottom: "clamp(1.5rem,4vw,2rem)" }}>
              More in {product.category}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,240px),1fr))", gap: "clamp(0.85rem,3vw,1.5rem)" }}>
              {related.map(p => (
                <Link key={p._id} href={`/product/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ background: "#fff", border: "1px solid var(--border)", overflow: "hidden" }}>
                    <div style={{ aspectRatio: "3/2", overflow: "hidden", background: "var(--bg-alt)" }}>
                      <img src={`${p.imageUrl}?w=400&auto=format&fit=crop&q=75`} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ padding: "clamp(0.85rem,2.5vw,1.1rem)" }}>
                      <p style={{ fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--amber)", fontWeight: 700, marginBottom: "0.3rem" }}>{p.category}</p>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem,2.5vw,1.15rem)", fontWeight: 400, color: "var(--ink)", marginBottom: "0.4rem", lineHeight: 1.3 }}>{p.title}</h3>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "0.6rem" }}>
                        <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--ink)" }}>{p.priceText}</span>
                        <span style={{ fontSize: "0.58rem", color: "var(--amber)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "0.25rem", textTransform: "uppercase" as const }}>View <ArrowRight size={10} /></span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
          <Link href="/collection" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, fontWeight: 600, color: "var(--stone)", textDecoration: "none" }}>
            <ArrowLeft size={13} /> Back to Collection
          </Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
