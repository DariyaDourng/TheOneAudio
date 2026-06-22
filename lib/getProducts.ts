/**
 * getProducts.ts
 * ─────────────────────────────────────────────────────────────
 * Fetches data directly from your GOOGLE_SHEET_CSV_URL environment variable.
 * ─────────────────────────────────────────────────────────────
 */

import { Product } from "./products";

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
  if (!SHEET_CSV_URL) {
    throw new Error("CRITICAL: GOOGLE_SHEET_CSV_URL is missing inside your Vercel Dashboard environment configurations.");
  }

  try {
    const res = await fetch(SHEET_CSV_URL, { 
      cache: "no-store",
      next: { revalidate: 0 } 
    });

    if (!res.ok) throw new Error(`Google Sheets responded with error status: ${res.status}`);

    const csv = await res.text();
    return parseCSV(csv);
  } catch (err) {
    console.error("Google Sheets pull failed:", err);
    return [];
  }
}