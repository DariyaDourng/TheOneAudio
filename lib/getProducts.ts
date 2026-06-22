/**
 * getProducts.ts (Robust Google Sheets Version)
 * ─────────────────────────────────────────────────────────────
 * Fetches products from Google Sheets (published as CSV).
 * Handles formatting edge-cases (\r\n) and adds explicit logging.
 * ─────────────────────────────────────────────────────────────
 */

import { DEMO_PRODUCTS, Product } from "./products";

const SHEET_CSV_URL = process.env.GOOGLE_SHEET_CSV_URL || "";

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  // Remove any hidden carriage returns (\r) from Windows line endings
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
  // Split securely by newline, ignoring completely empty lines
  const lines = csv.split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length <= 1) return [];

  return lines
    .slice(1) // Skip your header row
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
    // Ensure both Title and Image exist, otherwise row is invalid
    .filter(p => {
      const isValid = Boolean(p.title && p.imageUrl);
      if (!isValid) {
        console.warn(`⚠️ Skipping row because it is missing Title or ImageUrl.`);
      }
      return isValid;
    });
}

export async function getProducts(): Promise<Product[]> {
  if (!SHEET_CSV_URL) {
    console.error("ERROR: GOOGLE_SHEET_CSV_URL environment variable is totally empty!");
    return DEMO_PRODUCTS;
  }

  try {
    console.log(`📡 Fetching from Google Sheets URL...`);
    const res = await fetch(SHEET_CSV_URL, {
      cache: 'no-store' // Forces Next.js to ignore old caches during debugging
    });

    if (!res.ok) {
      throw new Error(`Google Sheets responded with HTTP status ${res.status}`);
    }

    const csv = await res.text();
    const products = parseCSV(csv);

    if (products.length === 0) {
      console.warn("Google Sheet connected, but parsed 0 valid products. Using fallback.");
      return DEMO_PRODUCTS;
    }

    console.log(`SUCCESS: Loaded ${products.length} products dynamically from Google Sheets.`);
    return products;
  } catch (err) {
    console.error("CRITICAL: Fetching Google Sheet failed entirely.", err);
    return DEMO_PRODUCTS;
  }
}