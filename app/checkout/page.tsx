"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart";
import { formatUZS } from "@/lib/format";

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError("");

    const data = new FormData(e.currentTarget);
    const payload = {
      customerName: String(data.get("ism") ?? ""),
      phone: String(data.get("telefon") ?? ""),
      address: String(data.get("manzil") ?? ""),
      items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Buyurtma yaratishda xatolik yuz berdi");
      }
      const json = (await res.json()) as { orderNumber: string };
      clearCart();
      router.push("/checkout/success?order=" + json.orderNumber);
    } catch {
      setError("Buyurtma yaratishda xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setPending(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold">Rasmiylashtirish</h1>
        <p className="mt-6 text-zinc-500">
          Savat bo'sh. Avval mahsulot tanlang.
        </p>
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
      <h1 className="text-3xl font-bold">Rasmiylashtirish</h1>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="ism"
              className="mb-1 block text-sm font-medium"
            >
              Ism
            </label>
            <input
              id="ism"
              name="ism"
              required
              type="text"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
            />
          </div>
          <div>
            <label
              htmlFor="telefon"
              className="mb-1 block text-sm font-medium"
            >
              Telefon
            </label>
            <input
              id="telefon"
              name="telefon"
              required
              type="tel"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
            />
          </div>
          <div>
            <label
              htmlFor="manzil"
              className="mb-1 block text-sm font-medium"
            >
              Manzil
            </label>
            <textarea
              id="manzil"
              name="manzil"
              required
              rows={3}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
          >
            {pending ? "Yuborilmoqda..." : "Buyurtmani berish"}
          </button>
        </form>

        <div>
          <h2 className="text-xl font-semibold">Savat ({count} ta)</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white p-3 text-sm"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-zinc-600">
                    {item.quantity} × {formatUZS(item.price)}
                  </p>
                </div>
                <p className="font-semibold">
                  {formatUZS(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between rounded-lg bg-zinc-100 px-4 py-4">
            <p className="font-semibold">Jami</p>
            <p className="text-xl font-bold">{formatUZS(total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
