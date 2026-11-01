import type { Metadata } from "next";
import { Suspense } from "react";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container-x py-24 text-center text-muted">Loading your booking…</div>}>
      <CheckoutFlow />
    </Suspense>
  );
}
