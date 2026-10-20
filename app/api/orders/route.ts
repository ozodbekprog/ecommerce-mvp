import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Noto'g'ri JSON" }, { status: 400 });
  }

  const { customerName, phone, address, items } = (body ?? {}) as {
    customerName?: unknown;
    phone?: unknown;
    address?: unknown;
    items?: unknown;
  };

  if (
    typeof customerName !== "string" ||
    customerName.trim() === "" ||
    typeof phone !== "string" ||
    phone.trim() === "" ||
    typeof address !== "string" ||
    address.trim() === ""
  ) {
    return Response.json(
      { error: "Ism, telefon va manzil majburiy" },
      { status: 400 },
    );
  }

  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    !items.every(
      (i) =>
        typeof i === "object" &&
        i !== null &&
        typeof (i as { id?: unknown }).id === "number" &&
        typeof (i as { quantity?: unknown }).quantity === "number" &&
        (i as { quantity: number }).quantity > 0,
    )
  ) {
    return Response.json(
      { error: "Mahsulotlar ro'yxati bo'sh bo'lishi mumkin emas" },
      { status: 400 },
    );
  }

  const ids = Array.from(
    new Set((items as { id: number; quantity: number }[]).map((i) => i.id)),
  );

  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
  });

  if (products.length !== ids.length) {
    return Response.json(
      { error: "Ba'zi mahsulotlar topilmadi" },
      { status: 400 },
    );
  }

  const productById = new Map(products.map((p) => [p.id, p]));
  const quantityById = new Map<number, number>();
  for (const i of items as { id: number; quantity: number }[]) {
    quantityById.set(i.id, (quantityById.get(i.id) ?? 0) + i.quantity);
  }

  const orderItems = [...quantityById.entries()].map(([productId, quantity]) => {
    const product = productById.get(productId)!;
    return {
      productId,
      name: product.name,
      price: product.price,
      quantity,
    };
  });

  const total = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const orderNumber = "ORD-" + Date.now().toString(36).toUpperCase();

  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      total,
      items: { create: orderItems },
    },
  });

  return Response.json(
    { orderNumber: order.orderNumber, id: order.id, total: order.total },
    { status: 201 },
  );
}
