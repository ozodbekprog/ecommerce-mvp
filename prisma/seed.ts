import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  { name: "Atlas Chapan", price: 349900, description: "An'anaviy chopon, sifatli mato", image: "https://picsum.photos/seed/1/600/400" },
  { name: "Tubeteika", price: 89900, description: "Qo'lda tikilgan tubeteika", image: "https://picsum.photos/seed/2/600/400" },
  { name: "Suzani Choyshab", price: 199900, description: "Qo'lda tikilgan suzani choyshab", image: "https://picsum.photos/seed/3/600/400" },
  { name: "Karakul Ko'ylak", price: 279900, description: "Sovg'a qilingan ko'ylak", image: "https://picsum.photos/seed/4/600/400" },
  { name: "Ayollar Libos", price: 459900, description: "Zamonaviy milliy libos", image: "https://picsum.photos/seed/5/600/400" },
  { name: "Erkak Ko'ylak", price: 219900, description: "Paxta erkak ko'ylagi", image: "https://picsum.photos/seed/6/600/400" },
  { name: "Burchak Tokcha", price: 149900, description: "Yengil yozgi tokcha", image: "https://picsum.photos/seed/7/600/400" },
  { name: "Milliy Aksessuar", price: 59900, description: "Qo'lda yasalgan aksessuar", image: "https://picsum.photos/seed/8/600/400" },
  { name: "Zargarlik Buyum", price: 599900, description: "Kumush zargarlik buyumi", image: "https://picsum.photos/seed/9/600/400" },
];

async function main() {
  await prisma.product.deleteMany();
  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log("Seed done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
