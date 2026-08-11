import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatBRL, useCart } from "@/lib/cart";
import { WHATSAPP_NUMBER } from "@/lib/products";

export function CartDrawer() {
  const { lines, total, count, isOpen, close, increment, decrement, remove } =
    useCart();

  const whatsappHref = () => {
    const items = lines
      .map(
        (l) =>
          `• ${l.qty}x ${l.product.name} (${l.product.material}) — ${formatBRL(
            l.qty * l.product.price,
          )}`,
      )
      .join("\n");
    const text = `Olá! Quero finalizar meu pedido na Argenta:\n\n${items}\n\nTotal: ${formatBRL(
      total,
    )}`;
    return `https://wa.me/${+551499123-5508}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={close}
        className={`fixed inset-0 z-40 bg-foreground/25 backdrop-blur-[2px] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Carrinho de compras"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[26rem] flex-col border-l border-border bg-background transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            <span className="eyebrow">Sacola ({count})</span>
          </div>
          <button
            onClick={close}
            aria-label="Fechar carrinho"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <ShoppingBag className="h-8 w-8 text-silver-2" strokeWidth={1} />
              <p className="text-sm text-muted-foreground">
                Sua sacola está vazia.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {lines.map((line) => (
                <li key={line.product.id} className="flex gap-4 py-5">
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-20 w-20 shrink-0 rounded-sm border border-border object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm">{line.product.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {line.product.material}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          aria-label="Diminuir quantidade"
                          onClick={() => decrement(line.product.id)}
                          className="p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs">
                          {line.qty}
                        </span>
                        <button
                          aria-label="Aumentar quantidade"
                          onClick={() => increment(line.product.id)}
                          className="p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm">
                          {formatBRL(line.qty * line.product.price)}
                        </span>
                        <button
                          aria-label={`Remover ${line.product.name}`}
                          onClick={() => remove(line.product.id)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-border px-6 py-6">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">Total</span>
            <span className="font-display text-2xl">{formatBRL(total)}</span>
          </div>
          <a
            href={lines.length ? whatsappHref() : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={lines.length === 0}
            className={`mt-5 flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity ${
              lines.length
                ? "hover:opacity-85"
                : "pointer-events-none opacity-40"
            }`}
          >
            Pagar via WhatsApp
          </a>
          <p className="mt-3 text-center text-[0.6875rem] text-muted-foreground">
            Pedido finalizado no WhatsApp — único meio de pagamento.
          </p>
        </footer>
      </aside>
    </>
  );
}
