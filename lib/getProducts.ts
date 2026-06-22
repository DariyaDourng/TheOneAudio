// /**
//  * getProducts.ts
//  * ─────────────────────────────────────────────────────────────
//  * Fetches products from Google Sheets (published as CSV).
//  * Falls back to DEMO_PRODUCTS if the Sheet URL is not set.
//  *
//  * How the Sheet maps to Product fields:
//  *   Column A → title
//  *   Column B → slug
//  *   Column C → category
//  *   Column D → priceText
//  *   Column E → badge        (optional, leave blank if none)
//  *   Column F → brand
//  *   Column G → origin
//  *   Column H → warranty
//  *   Column I → imageUrl
//  *   Column J → galleryUrls  (comma-separated URLs)
//  *   Column K → description
//  *   Column L → specs        (pipe-separated, e.g. "100W/ch|Dual VU meters")
//  *   Column M → order        (number, 1 = first)
//  * ─────────────────────────────────────────────────────────────
//  */

// import { DEMO_PRODUCTS, Product } from "./products";

// const SHEET_CSV_URL = process.env.GOOGLE_SHEET_CSV_URL || "";

// function parseCSVLine(line: string): string[] {
//   const result: string[] = [];
//   let current = "";
//   let inQuotes = false;

//   for (let i = 0; i < line.length; i++) {
//     const char = line[i];
//     if (char === '"') {
//       if (inQuotes && line[i + 1] === '"') {
//         current += '"';
//         i++;
//       } else {
//         inQuotes = !inQuotes;
//       }
//     } else if (char === "," && !inQuotes) {
//       result.push(current.trim());
//       current = "";
//     } else {
//       current += char;
//     }
//   }
//   result.push(current.trim());
//   return result;
// }

// function parseCSV(csv: string): Product[] {
//   const lines  = csv.trim().split("\n");
//   const header = lines[0]; // skip header row
//   void header;

//   return lines
//     .slice(1) // skip header
//     .filter(line => line.trim() !== "")
//     .map((line, index) => {
//       const cols = parseCSVLine(line);

//       const [
//         title      = "",
//         slug       = "",
//         category   = "",
//         priceText  = "",
//         badge      = "",
//         brand      = "",
//         origin     = "",
//         warranty   = "",
//         imageUrl   = "",
//         galleryRaw = "",
//         description = "",
//         specsRaw   = "",
//         orderRaw   = "",
//       ] = cols;

//       return {
//         _id:         `sheet-${index + 1}`,
//         title:       title.trim(),
//         slug:        slug.trim() || title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
//         category:    category.trim(),
//         priceText:   priceText.trim(),
//         badge:       badge.trim() || undefined,
//         brand:       brand.trim() || undefined,
//         origin:      origin.trim() || undefined,
//         warranty:    warranty.trim() || undefined,
//         imageUrl:    imageUrl.trim(),
//         galleryUrls: galleryRaw
//           ? galleryRaw.split(",").map(u => u.trim()).filter(Boolean)
//           : [],
//         description: description.trim() || undefined,
//         specs:       specsRaw
//           ? specsRaw.split("|").map(s => s.trim()).filter(Boolean)
//           : [],
//       } as Product;
//     })
//     .filter(p => p.title && p.imageUrl); // skip empty / incomplete rows
// }

// export async function getProducts(): Promise<Product[]> {
//   // No Sheet URL configured → use demo data
//   if (!SHEET_CSV_URL) {
//     console.log("ℹ️  GOOGLE_SHEET_CSV_URL not set — using demo products.");
//     return DEMO_PRODUCTS;
//   }

//   try {
//     const res = await fetch(SHEET_CSV_URL, {
//       // Next.js cache: revalidate every 60 seconds (ISR-style)
//       next: { revalidate: 60 },
//     });

//     if (!res.ok) throw new Error(`HTTP ${res.status}`);

//     const csv      = await res.text();
//     const products = parseCSV(csv);

//     if (products.length === 0) {
//       console.warn("⚠️  Sheet returned 0 products — using demo products.");
//       return DEMO_PRODUCTS;
//     }

//     console.log(`✅  Loaded ${products.length} products from Google Sheets.`);
//     return products;
//   } catch (err) {
//     console.warn("⚠️  Google Sheets fetch failed — using demo products.", err);
//     return DEMO_PRODUCTS;
//   }
// }


/**
 * getProducts.ts
 * ─────────────────────────────────────────────────────────────
 * Returns products directly from the local static array.
 * Google Sheets backend has been completely removed to ensure
 * reliability and eliminate environment variable configuration.
 * ─────────────────────────────────────────────────────────────
 */

import { DEMO_PRODUCTS, Product } from "./products";

/**
 * Fetches the list of products available for the store.
 * Now references the local `DEMO_PRODUCTS` data layer directly.
 */
export async function getProducts(): Promise<Product[]> {
  console.log(`✅ Loaded ${DEMO_PRODUCTS.length} products locally from products.ts.`);
  return DEMO_PRODUCTS;
}