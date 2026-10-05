"use client";
import Link from "next/link";
import { brand } from "@/lib/data";

export function StickyCta() {
  return (
    <div className="fixed bottom-5 left-5 z-40 hidden sm:block">
      <Link href={brand.isBooking ? "/quote" : "/shop"} className="btn-primary shadow-lg">
        {brand.cta}
      </Link>
    </div>
  );
}
