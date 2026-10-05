import productsA from "./products-a.json";
import productsB from "./products-b.json";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviewCount: number;
  badge: string | null;
  related: string[];
  faq: [string, string][];
  specs: Record<string, string>;
  variants: string[];
  [key: string]: unknown;
};

export const brand = {
  slug: "cornerstone-builds",
  name: "Cornerstone Builds",
  tagline: "Homes built with clarity.",
  niche: "Construction company",
  description: "Residential and light-commercial builders — project showcase, process transparency, and quote requests.",
  cta: "Request a quote",
  checkoutNote: "Quote request deposits are simulated — no real charges.",
  heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=80",
  heroVideo: "https://videos.pexels.com/video-files/3773486/3773486-uhd_2560_1440_25fps.mp4",
  categories: ["Custom Homes","Remodels","Commercial","ADUs","Consults"] as string[],
  isBooking: true,
  offer: {"code":"FOUNDATION","label":"Complimentary feasibility consult this month","ends":"Limited slots"},
  loyalty: "Owner portal — milestone photos & change orders",
  stats: [["120+","homes delivered"],["On-time","milestone culture"],["4.9","owner rating"],["Licensed","GC + trade crews"]] as [string, string][],
  marquee: ["Building → floor → unit ·","Walkthrough films ·","Transparent allowances ·","Permit guidance ·","Owner portal ·"] as string[],
  reviews: [["The Nguyens",5,"Journey tool helped us pick a corner unit before we visited."],["Dana S.",5,"Quote request was detailed. No surprise allowances."],["Rafael C.",5,"Walkthrough video of framing weekly — felt in control."]] as [string, number, string][],
  ai: [["Townhome vs condo build?","Townhomes give outdoor pads; mid-rise units trade yard for views. Start the Building Journey to compare."],["How does quoting work?","Share lot/unit + finish level on /quote. We return a banded estimate in 2 business days."],["Can I upgrade kitchens later?","Yes — allowances are itemized. Lock structural early; finishes can phase."],["Consult offer?","Use FOUNDATION for a free feasibility consult this month."]] as [string, string][],
  blog: [["Reading a finish allowance","Owners"],["What happens at framing walkthrough","Process"],["Permit timelines by city","Guides"]] as [string, string][],
  stores: ["Cornerstone Studio — Design District"] as string[],
  nicheKind: "construction" as string,
};

export const products: Product[] = [...(productsA as Product[]), ...(productsB as Product[])];

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function relatedProducts(p: Product) {
  return p.related.map(getProduct).filter(Boolean) as Product[];
}
