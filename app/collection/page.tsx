import { getProducts } from "@/lib/getProducts";
import { CATEGORIES } from "@/lib/products";
import CollectionClientGrid from "./CollectionClientGrid";

// Force fully dynamic data fetches
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CollectionPage() {
  const products = await getProducts();

  return (
    <>
      {/* Native CSS Injection to bypass styled-jsx limitations in Server Modules */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
          .filter-sidebar { display: none !important; }
          .filter-mobile  { display: block !important; }
        }
      `}} />
      
      <CollectionClientGrid 
        initialProducts={products} 
        categories={CATEGORIES} 
      />
    </>
  );
}