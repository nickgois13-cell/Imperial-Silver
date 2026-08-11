import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "As peças são de prata 925 legítima?",
    a: "Sim. Todas as peças são fundidas em prata esterlina 925 com selo de autenticidade e acompanham certificado.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "O pedido é fechado diretamente pelo WhatsApp. Você monta a sacola aqui, clica em Pagar via WhatsApp e nossa equipe envia o link de pagamento e confirma o envio.",
  },
  {
    q: "Qual o prazo de entrega?",
    a: "Enviamos em até 24h úteis. Capitais recebem em 2 a 4 dias úteis e demais regiões em até 8 dias úteis, com rastreio.",
  },
  {
    q: "A prata escurece com o tempo?",
    a: "A oxidação é natural. Cada pedido acompanha flanela de polimento — e o brilho original volta em segundos.",
  },
  {
    q: "Posso trocar ou devolver?",
    a: "Sim, em até 30 dias após o recebimento, com a peça sem sinais de uso. A primeira troca de tamanho é gratuita.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-muted-foreground"
            >
              <span className="font-display text-xl">{item.q}</span>
              {isOpen ? (
                <Minus className="h-4 w-4 shrink-0" />
              ) : (
                <Plus className="h-4 w-4 shrink-0" />
              )}
            </button>
            <div
              className="grid overflow-hidden transition-all duration-500 ease-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p className="min-h-0 pb-6 pr-10 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}