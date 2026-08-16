import { Plus } from "lucide-react";
import { formatBRL, useCart, type Product } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="group relative overflow-hidden border border-border bg-card transition-shadow duration-500 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <span className="border border-foreground px-5 py-2.5 text-[0.6875rem] uppercase tracking-[0.2em] text-foreground">
              Fora de estoque
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl">{product.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {product.material}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {product.detail}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="font-display text-2xl">
            {formatBRL(product.price)}
          </span>
          <button
            onClick={() => add(product)}
            disabled={!product.inStock}
            className="flex items-center gap-2 border border-foreground px-5 py-3 text-[0.6875rem] uppercase tracking-[0.2em] transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:border-muted-foreground/50 disabled:text-muted-foreground/50"
          >
            <Plus className="h-3 w-3" />
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}