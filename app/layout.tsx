import type { Metadata } from "next";
import Link from "next/link";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-commerce MVP",
  description: "Uzbek e-commerce MVP",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz">
      <body className="min-h-screen flex flex-col">
        <header className="border-b">
          <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
            <Link className="font-semibold hover:underline" href="/">Katalog</Link>
            <Link className="hover:underline" href="/cart">Savat</Link>
            <Link className="hover:underline" href="/admin">Admin</Link>
          </nav>
        </header>
        <main className="flex-1">
          <CartProvider>{children}</CartProvider>
        </main>
      </body>
    </html>
  );
}
