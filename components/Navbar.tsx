"use client";
import Link from "next/link";
import React from "react";
import { Moon, Sun } from "lucide-react";

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
  const [theme, setTheme] = React.useState<"light" | "dark" | null>("light");

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const root = document.documentElement;
      if (stored === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        setTheme("dark");
        return;
      }
      if (stored === "light") {
        root.classList.add("light");
        root.classList.remove("dark");
        setTheme("light");
        return;
      }
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
        root.classList.remove("light");
        setTheme("dark");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
        setTheme("light");
      }
    } catch {
      // fallback
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    const root = document.documentElement;
    const next = theme === "dark" ? "light" : "dark";
    if (next === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
  };
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[--color-surface] muted-border border-b">
      <div className="container-max flex h-14 items-center justify-between">
        <Link href="#" className="text-sm font-semibold">iPocket Brasil</Link>
        <nav className="hidden items-center gap-3 text-sm text-[--color-ink] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:opacity-90 cursor-pointer">
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md shadow-sm backdrop-blur cursor-pointer muted-border bg-[--color-surface] text-[--color-ink] hover:bg-[--color-muted]"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
        <div className="md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-md shadow-sm backdrop-blur cursor-pointer muted-border bg-[--color-surface] text-[--color-ink] hover:bg-[--color-muted]"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="rounded-md px-3 py-1 text-sm cursor-pointer muted-border bg-[--color-surface] hover:bg-[--color-muted]"
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t py-2 md:hidden muted-border bg-[--color-surface]">
          <nav className="container-max grid grid-cols-2 gap-2 text-sm">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="rounded-md px-3 py-2 hover:bg-[--color-muted] cursor-pointer" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
