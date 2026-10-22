"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
                <Link href="/" className="text-lg font-bold text-gradient">
                    {SITE_NAME}
                </Link>

                {/* Escritorio: menú + buscador visibles */}
                <NavLinks className="hidden items-center gap-1 md:flex" />
                <div className="hidden w-72 md:block">
                    <SearchBox />
                </div>

                {/* Móvil: botón hamburguesa */}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Abrir menú"
                    aria-expanded={open}
                    className="rounded-md p-2 text-slate-300 hover:bg-slate-800 md:hidden"
                >
                    {open ? "✕" : "☰"}
                </button>
            </nav>

            {/* Móvil: panel desplegable */}
            {open && (
                <div className="space-y-3 border-t border-slate-800 px-4 py-3 md:hidden">
                    <SearchBox />
                    <NavLinks onNavigate={() => setOpen(false)} className="space-y-1" />
                </div>
            )}
        </header>
    );
}