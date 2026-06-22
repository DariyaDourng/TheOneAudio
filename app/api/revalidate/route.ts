/**
 * /api/revalidate
 * ─────────────────────────────────────────────────────────────
 * Called by Google Apps Script whenever the Sheet is edited.
 * Tells Next.js to immediately re-fetch products from the Sheet
 * instead of waiting for the 60-second cache to expire.
 *
 * Protected by a secret token so only your Apps Script can call it.
 *
 * Apps Script calls:
 *   POST https://your-site.com/api/revalidate
 *   Headers: { "x-revalidate-token": "YOUR_SECRET" }
 * ─────────────────────────────────────────────────────────────
 */

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.REVALIDATE_SECRET || "";

export async function POST(req: NextRequest) {
  // Check secret token
  const token = req.headers.get("x-revalidate-token");

  if (!SECRET) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET not configured on server." },
      { status: 500 }
    );
  }

  if (token !== SECRET) {
    return NextResponse.json(
      { error: "Invalid token." },
      { status: 401 }
    );
  }

  try {
    // Revalidate all pages that show products
    revalidatePath("/");
    revalidatePath("/collection");
    revalidatePath("/product/[slug]", "page");

    console.log("🔄  Revalidated all product pages via webhook.");

    return NextResponse.json({
      success:   true,
      revalidated: ["/", "/collection", "/product/[slug]"],
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}

// Also support GET for easy browser testing
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!SECRET || token !== SECRET) {
    return NextResponse.json({ error: "Invalid or missing token." }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/collection");
  revalidatePath("/product/[slug]", "page");

  return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
}
