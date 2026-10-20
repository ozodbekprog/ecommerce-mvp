"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatUZS } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, setQuantity, total, count } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold">Savat</h1>
        <p className="mt-6 text-zinc-500">Savat bo'sh</p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Katalogga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Savat</h1>
      <p className="mt-2 text-zinc-600">{count} ta mahsulot</p>

      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-24 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-zinc-600">{formatUZS(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity(item.id, item.quantity - 1)}
                className="h-8 w-8 rounded-md border border-zinc-300 hover:bg-zinc-100"
                aria-label="Kamaytirish"
              >
                &minus;
              </button>
              <span className="min-w-8 text-center font-medium">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(item.id, item.quantity + 1)}
                className="h-8 w-8 rounded-md border border-zinc-300 hover:bg-zinc-100"
                aria-label="Oshirish"
              >
                +
              </button>
            </div>
            <p className="w-28 text-right font-semibold">
              {formatUZS(item.price * item.quantity)}
            </p>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              O'chirish
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between rounded-lg bg-zinc-100 px-4 py-4">
        <p className="font-semibold">Jami</p>
        <p className="text-xl font-bold">{formatUZS(total)}</p>
      </div>

      <div className="mt-6">
        <Link
          href="/checkout"
          className="inline-block rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Buyurtma berish
        </Link>
      </div>
    </div>
  );
}
