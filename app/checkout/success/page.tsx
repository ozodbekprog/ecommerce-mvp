import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatUZS } from "@/lib/format";

export const instant = false;

export default async function CheckoutSuccessPage({
  searchParams,
}: PageProps<"/checkout/success">) {
  const sp = await searchParams;
  const orderNumber = sp?.order as string | undefined;

  const order = orderNumber
    ? await prisma.order.findUnique({
        where: { orderNumber },
      })
    : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">
        Buyurtmangiz qabul qilindi!
      </h1>
      {order ? (
        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6">
          <p className="text-zinc-600">Buyurtma raqami</p>
          <p className="mt-1 text-xl font-bold">{order.orderNumber}</p>
          <p className="mt-4 text-zinc-600">Jami</p>
          <p className="text-2xl font-bold">{formatUZS(order.total)}</p>
        </div>
      ) : (
        <p className="mt-4 text-zinc-600">
          {orderNumber ? `Buyurtma raqami: ${orderNumber}` : ""}
        </p>
      )}
      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
      >
        Katalogga qaytish
      </Link>
    </div>
  );
}
