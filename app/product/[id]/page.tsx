import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatUZS } from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";

export const instant = false;

export default async function ProductDetailPage({
  params,
}: PageProps<"/product/[id]">) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/" className="text-sm text-zinc-600 hover:underline">
        &larr; Orqaga
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full rounded-lg object-cover md:h-96"
        />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-3 text-2xl font-semibold text-zinc-900">
            {formatUZS(product.price)}
          </p>
          <p className="mt-4 text-zinc-600">{product.description}</p>
          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
