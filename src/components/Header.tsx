import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { href: "#pulseiras", label: "Pulseiras" },
  { href: "#colares", label: "Colares" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#faq", label: "FAQ" },
  { href: "#sobre", label: "Sobre Nós" },
];

export function Header() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a
          href="#top"
          className={`font-display text-xl tracking-[0.35em] transition-colors ${
            scrolled ? "text-foreground" : "text-background"
          }`}
        >
          IMPERIAL SILVER
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-xs uppercase tracking-[0.18em] transition-colors ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-background/75 hover:text-background"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={open}
          aria-label="Abrir carrinho"
          className={`relative flex items-center gap-2 border px-4 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors ${
            scrolled
              ? "border-border text-foreground hover:bg-secondary"
              : "border-background/40 text-background hover:bg-background/10"
          }`}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Sacola
          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[0.625rem] text-background">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
