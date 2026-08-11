import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Product = {
  id: string;
  name: string;
  category: "pulseiras" | "colares";
  price: number;
  detail: string;
  material: string;
  image: string;
};

export type CartLine = { product: Product; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((product: Product) => {
    setLines((prev) => {
      const found = prev.find((l) => l.product.id === product.id);
      if (found) {
        return prev.map((l) =>
          l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const increment = useCallback((id: string) => {
    setLines((prev) =>
      prev.map((l) => (l.product.id === id ? { ...l, qty: l.qty + 1 } : l)),
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setLines((prev) =>
      prev
        .map((l) => (l.product.id === id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== id));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const total = lines.reduce((sum, l) => sum + l.qty * l.product.price, 0);
    return {
      lines,
      count,
      total,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      increment,
      decrement,
      remove,
      clear: () => setLines([]),
    };
  }, [lines, isOpen, add, increment, decrement, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });