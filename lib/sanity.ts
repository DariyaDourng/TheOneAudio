import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// ─── GROQ Query ───────────────────────────────────────────────
// Returns mainImage CDN URL when available, falls back to
// fallbackImageUrl (Unsplash) seeded by the seed script.
export const PRODUCTS_QUERY = `
  *[_type == "product"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    badge,
    priceText,
    brand,
    origin,
    warranty,
    description,
    specs,
    "imageUrl": select(
      defined(mainImage.asset) => mainImage.asset->url,
      fallbackImageUrl
    ),
    "galleryUrls": gallery[].asset->url,
    fallbackImageUrl
  }
`;
