"use client";
import { useState } from "react";

export function ProductGallery({ images, title, badge }: { images: string[]; title: string; badge?: string }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div>
      <div style={{ position: "relative", background: "var(--bg-alt)", border: "1px solid var(--border)", overflow: "hidden", marginBottom: "0.85rem" }}>
        <img
          key={activeImg}
          src={`${images[activeImg]}?w=900&auto=format&fit=crop&q=85`}
          alt={title}
          style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
        />
        {badge && (
          <span style={{ position: "absolute", top: "1rem", left: "1rem", background: "var(--amber)", color: "#fff", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, padding: "0.3rem 0.7rem" }}>{badge}</span>
        )}
      </div>

      {images.length > 1 && (
        <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              style={{
                width: "clamp(60px,18%,80px)", aspectRatio: "1",
                border: i === activeImg ? "2px solid var(--amber)" : "2px solid var(--border)",
                overflow: "hidden", background: "var(--bg-alt)",
                cursor: "pointer", padding: 0, flexShrink: 0,
                transition: "border-color 0.18s",
              }}
            >
              <img src={`${url}?w=200&auto=format&fit=crop&q=70`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
