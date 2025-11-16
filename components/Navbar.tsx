"use client";
import Link from "next/link";
import React from "react";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#porque-agora", label: "Por que agora?" },
  { href: "#design", label: "Design" },
  { href: "#cores", label: "Cores" },
  { href: "#preco", label: "Preço" },
  { href: "#como-comprar", label: "Como comprar" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
  { href: "#encomenda", label: "Encomendar" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/70 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/70">
      <div className="container-max flex h-14 items-center justify-between">
        <Link href="#" className="text-sm font-semibold">iPocket Brasil</Link>
        <nav className="hidden gap-6 text-sm text-zinc-700 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-black dark:text-zinc-300 dark:hover:text-white cursor-pointer">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="rounded-md border px-3 py-1 text-sm cursor-pointer"
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-zinc-200/60 bg-white py-2 dark:border-zinc-800/60 dark:bg-zinc-950 md:hidden">
          <nav className="container-max grid grid-cols-2 gap-2 text-sm">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
