import { prisma } from "@/lib/prisma";
import { formatUZS } from "@/lib/format";

export const instant = false;

export default async function AdminPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Buyurtmalar</h1>

      {orders.length === 0 ? (
        <p className="mt-6 text-zinc-500">Buyurtmalar yo&apos;q</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 border border-zinc-200 text-sm">
            <thead className="bg-zinc-100 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Buyurtma raqami</th>
                <th className="px-4 py-3 font-semibold">Mijoz</th>
                <th className="px-4 py-3 font-semibold">Telefon</th>
                <th className="px-4 py-3 font-semibold">Manzil</th>
                <th className="px-4 py-3 font-semibold">Summa</th>
                <th className="px-4 py-3 font-semibold">Sana</th>
                <th className="px-4 py-3 font-semibold">Mahsulotlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 font-medium">
                    {order.orderNumber}
                  </td>
                  <td className="px-4 py-3">{order.customerName}</td>
                  <td className="px-4 py-3">{order.phone}</td>
                  <td className="px-4 py-3">{order.address}</td>
                  <td className="px-4 py-3 font-semibold">
                    {formatUZS(order.total)}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleString("ru-RU")}
                  </td>
                  <td className="px-4 py-3">
                    <ul className="space-y-1">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
