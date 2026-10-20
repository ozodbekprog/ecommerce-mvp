import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatUZS } from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";

export const instant = false;

export default async function CatalogPage({
  searchParams,
}: PageProps<"/">) {
  const sp = await searchParams;
  const q = (sp?.q ?? "") as string;

  const products = await prisma.product.findMany({
    where: q ? { name: { contains: q } } : undefined,
    orderBy: { id: "asc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Katalog</h1>
      <p className="mt-2 text-zinc-600">
        {q ? `“${q}” bo'yicha qidiruv natijalari` : "Barcha mahsulotlar"}
      </p>

      <form method="GET" action="/" className="mt-6 flex max-w-md gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Mahsulot qidirish..."
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900"
        />
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Qidirish
        </button>
      </form>

      {products.length === 0 ? (
        <p className="mt-10 text-center text-zinc-500">Natija topilmadi</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
            >
              <Link href={`/product/${p.id}`} className="block">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-48 w-full object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col p-4">
                <Link
                  href={`/product/${p.id}`}
                  className="font-semibold hover:underline"
                >
                  {p.name}
                </Link>
                <p className="mt-2 text-zinc-900">{formatUZS(p.price)}</p>
                <div className="mt-auto pt-4">
                  <AddToCartButton product={p} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
