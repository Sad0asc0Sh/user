import type { Metadata } from "next";
import ProductsPageClient from "./ProductsPageClient";

export const revalidate = 300;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

type SearchParams = {
  category?: string;
  search?: string;
  sort?: string;
  page?: string;
  minPrice?: string;
  maxPrice?: string;
};

const humanizeCategory = (slug: string) => slug.replace(/[-_]/g, " ");

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined;
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : undefined;
  const pageParam = typeof searchParams.page === "string" ? Number(searchParams.page) : undefined;
  const minPrice = typeof searchParams.minPrice === "string" ? searchParams.minPrice : undefined;
  const maxPrice = typeof searchParams.maxPrice === "string" ? searchParams.maxPrice : undefined;

  const canonicalPath = category ? `/products?category=${encodeURIComponent(category)}` : "/products";
  const canonical = SITE_URL ? `${SITE_URL}${canonicalPath}` : canonicalPath;

  const pageNumber = Number.isFinite(pageParam) && pageParam ? pageParam : 1;
  const hasFilters = pageNumber > 1 || Boolean(sort) || Boolean(minPrice) || Boolean(maxPrice);
  const indexable = !hasFilters;

  let title = "همه محصولات | فروشگاه";
  if (category) {
    title = `محصولات ${humanizeCategory(category)} | فروشگاه`;
  } else if (search) {
    title = `نتایج جستجو: ${search} | فروشگاه`;
  }

  return {
    title,
    alternates: {
      canonical,
    },
    robots: {
      index: indexable,
      follow: indexable,
    },
  };
}

export default function ProductListingPage() {
  return <ProductsPageClient />;
}
