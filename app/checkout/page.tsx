import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { CheckoutForm } from "@/components/ui/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — Tennex Express",
  description: "Complete your Tennex Express order.",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <CheckoutForm />
      </main>
    </>
  );
}
