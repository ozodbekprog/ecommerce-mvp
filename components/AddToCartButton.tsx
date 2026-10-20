"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function AddToCartButton({
  product,
}: {
  product: { id: number; name: string; price: number; image: string };
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handle = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handle}
      className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-70"
    >
      {added ? "Qo'shildi ✓" : "Savatga"}
    </button>
  );
}
