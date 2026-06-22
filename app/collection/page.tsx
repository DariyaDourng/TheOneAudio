import { getProducts } from "@/lib/getProducts";
import CollectionClientGrid from "./CollectionClientGrid";

// Disable build-time caching to ensure Google Sheet data stays fresh
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CollectionPage() {
  // 1. Fetch real-time products data from your Google Sheet
  const products = await getProducts();

  // 2. Automatically generate unique categories from your active product rows
  // This reads whatever you type into your sheet and formats it cleanly!
  const uniqueCategories = Array.from(
    new Set(products.map((p) => p.category.trim()))
  ).filter(Boolean);

  // 3. Combine "All" with your dynamic list so it matches your original design
  const categories = ["All", ...uniqueCategories];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
          .filter-sidebar { display: none !important; }
          .filter-mobile  { display: block !important; }
        }
      `}} />
      
      <CollectionClientGrid 
        initialProducts={products} 
        categories={categories} 
      />
    </>
  );
}