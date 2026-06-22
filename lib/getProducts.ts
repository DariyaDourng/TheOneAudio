/**
 * getProducts.ts
 * ─────────────────────────────────────────────────────────────
 * Forces dynamic execution and strips Next.js data caching
 * to guarantee that data loads directly from Google Sheets.
 * ─────────────────────────────────────────────────────────────
 */

import { DEMO_PRODUCTS, Product } from "./products";

// Tells Next.js to never statically bake this page/data during the build phase
export const dynamic = "force-dynamic";
export const revalidate = 0;

const SHEET_CSV_URL = process.env.GOOGLE_SHEET_CSV_URL || "";

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  const cleanLine = line.replace(/\r/g, "");

  for (let i = 0; i < cleanLine.length; i++) {
    const char = cleanLine[i];
    if (char === '"') {
      if (inQuotes && cleanLine[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(csv: string): Product[] {
  const lines = csv.split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length <= 1) return [];

  return lines
    .slice(1) // Skip csv headers
    .map((line, index) => {
      const cols = parseCSVLine(line);
      const [
        title       = "",
        slug        = "",
        category    = "",
        priceText   = "",
        badge       = "",
        brand       = "",
        origin      = "",
        warranty    = "",
        imageUrl    = "",
        galleryRaw  = "",
        description = "",
        specsRaw    = "",
      ] = cols;

      return {
        _id:         `sheet-${index + 1}`,
        title:       title.trim(),
        slug:        slug.trim() || title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        category:    category.trim(),
        priceText:   priceText.trim(),
        badge:       badge.trim() || undefined,
        brand:       brand.trim() || undefined,
        origin:      origin.trim() || undefined,
        warranty:    warranty.trim() || undefined,
        imageUrl:    imageUrl.trim(),
        galleryUrls: galleryRaw ? galleryRaw.split(",").map(u => u.trim()).filter(Boolean) : [],
        description: description.trim() || undefined,
        specs:       specsRaw ? specsRaw.split("|").map(s => s.trim()).filter(Boolean) : [],
      } as Product;
    })
    .filter(p => Boolean(p.title && p.imageUrl));
}

export async function getProducts(): Promise<Product[]> {
  // Fallback diagnostic logging
  if (!SHEET_CSV_URL) {
    console.error("GOOGLE_SHEET_CSV_URL is missing from environment variables.");
    return DEMO_PRODUCTS;
  }

  try {
    // cache: 'no-store' instructs Vercel Data Cache to bypass saving this request
    const res = await fetch(SHEET_CSV_URL, { 
      cache: "no-store",
      next: { revalidate: 0 } 
    });

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const csv = await res.text();
    const products = parseCSV(csv);

    if (products.length === 0) {
      console.warn("CSV parsed 0 items. Ensure columns align with parser keys.");
      return DEMO_PRODUCTS;
    }

    return products;
  } catch (err) {
    console.error("Failed to pull live Google Sheet rows:", err);
    return DEMO_PRODUCTS;
  }
}