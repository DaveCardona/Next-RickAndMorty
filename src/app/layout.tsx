import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Navbar, Footer } from "@/components/layout";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Explora personajes, episodios y locaciones del universo de Rick and Morty.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geist.className} flex min-h-screen flex-col bg-slate-950 text-slate-100`}>
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}