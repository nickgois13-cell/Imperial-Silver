import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Star, Volume2, VolumeX } from "lucide-react";

import { CartDrawer } from "@/components/CartDrawer";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SilverCursor } from "@/components/SilverCursor";
import { CartProvider } from "@/lib/cart";
import { products, WHATSAPP_NUMBER } from "@/lib/products";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import heroPoster from "@/assets/hero-poster.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imperial Silver — Pulseiras e Colares de Prata 925" },
      {
        name: "description",
        content:
          "Joalheria de prata 925 em edições reduzidas. Pulseiras e colares com acabamento espelhado e pedido finalizado pelo WhatsApp.",
      },
      { property: "og:title", content: "Imperial Silver — Prata 925 em edições reduzidas" },
      {
        property: "og:description",
        content:
          "Duas pulseiras e dois colares de prata 925, com carrinho e checkout direto no WhatsApp.",
      },
    ],
  }),
  component: Index,
});

const reviews = [
  {
    name: "ALINE F.",
    city: "Agudos, SP",
    text: "A pulseira trançada é ainda mais bonita ao vivo. Peso e brilho de joalheria de verdade.",
    stars: 5,
  },
  {
    name: "DIONE K.",
    city: "Agudos,SP",
    text: "Fechei tudo pelo WhatsApp em dois minutos e recebi em três dias. Atendimento impecável.",
    stars: 5,
  },
  {
    name: "PATRICIA A.",
    city: "Agudos, SP",
    text: "Uso o colar ponto de luz todos os dias, inclusive na academia, e continua intacto.",
    stars: 5,
  },
  {
    name: "Camila R.",
    city: "Agudos, SP",
    text: "Embalagem linda, certificado da prata e flanela. Comprei o segundo de presente.",
    stars: 5,
  },
];

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo.url}
        poster={heroPoster}
        autoPlay
        loop
        muted={muted}
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/25 to-foreground/75" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-6 pb-20 pt-40">
        <Reveal>
          <p className="text-[0.6875rem] uppercase tracking-[0.32em] text-background/70">
            Prata 925 · Edições reduzidas
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.05] text-background sm:text-6xl md:text-7xl">
            O brilho discreto de quem
            <span className="text-silver"> não precisa de excesso</span>
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-background/80">
            Quatro peças, feitas à mão em prata esterlina, com polimento
            espelhado e certificado de autenticidade. Sacola montada aqui,
            pedido finalizado no WhatsApp.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#pulseiras"
              className="bg-background px-8 py-4 text-[0.6875rem] uppercase tracking-[0.2em] text-foreground transition-opacity hover:opacity-85"
            >
              Ver pulseiras
            </a>
            <a
              href="#colares"
              className="border border-background/50 px-8 py-4 text-[0.6875rem] uppercase tracking-[0.2em] text-background transition-colors hover:bg-background/10"
            >
              Ver colares
            </a>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-6 right-6 flex gap-2">
        <button
          onClick={toggle}
          aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
          className="rounded-full border border-background/40 p-3 text-background backdrop-blur-sm transition-colors hover:bg-background/15"
        >
          {playing ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
        </button>
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Ativar som" : "Desativar som"}
          className="rounded-full border border-background/40 p-3 text-background backdrop-blur-sm transition-colors hover:bg-background/15"
        >
          {muted ? (
            <VolumeX className="h-3.5 w-3.5" />
          ) : (
            <Volume2 className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Prata 925 certificada",
    "\n",
    "\n",
    "Feito à mão no Brasil",
  ];
  return (
    <div className="border-b border-border bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-y-3 px-6 py-5 sm:grid-cols-2 md:grid-cols-4">
        {items.map((i, idx) => (
          <p key={idx} className="eyebrow text-center">
            {i}
          </p>
        ))}
      </div>
    </div>
  );
}

function ProductSection({
  id,
  eyebrow,
  title,
  copy,
  category,
}: {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  category: "pulseiras" | "colares";
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="text-4xl md:text-5xl">{title}</h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {copy}
          </p>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {products
          .filter((p) => p.category === category)
          .map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <ProductCard product={p} />
            </Reveal>
          ))}
      </div>
    </section>
  );
}

function About() {
  const differentials = [
    {
      title: "Materiais nobres",
      desc: "Prata esterlina 925 com polimento espelhado, sem banhos que descascam com o tempo.",
    },
    {
      title: "Atendimento real",
      desc: "Cada pedido é finalizado diretamente no WhatsApp, com acompanhamento humano do início ao fim.",
    },
    {
      title: "Edições reduzidas",
      desc: "Peças lançadas em pequenos lotes para garantir controle de qualidade e exclusividade.",
    },
    {
      title: "Feito no Brasil",
      desc: "Produção, conferência e embalagem feitas em Agudos, SP, com mão de obra local.",
    },
  ];

  const members = [
    { role: "FUNDADOR", initials: "\n", name: "Felipe Demétrio" },
    { role: "MIDIA", initials: "\n", name: "Nicolas Fadoni" },
    { role: "DESIGN", initials: "\n", name: "Luis Postinguel" },
  ];

  return (
    <section id="sobre" className="scroll-mt-24 bg-secondary/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">Sobre Nós</p>
          <div className="mt-3 grid gap-10 md:grid-cols-2 md:items-end">
            <h2 className="text-4xl md:text-5xl">
              De uma aula de empreendedorismo para quem entende brilho de
              verdade
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              A Imperial Silver nasceu dentro de uma sala de aula, a partir de um
              projeto de empreendedorismo que uniu a vontade de criar algo
              próprio com o amor por joias atemporais. Somos revendedores de
              prata 925, e o que começou como uma ideia discutida entre amigos
              virou uma marca feita para ser usada no dia a dia — sem pressa,
              sem excesso.
            </p>
          </div>
        </Reveal>


        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <Reveal>
            <div className="border border-border bg-card p-8">
              <p className="text-[0.6875rem] uppercase tracking-[0.28em] text-muted-foreground">
                O que trazemos
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Trabalhamos para entregar peças que combinem qualidade, preço
                justo e design clean. Nosso foco é oferecer joias de prata 925
                que acompanhem o cliente em todos os momentos — do trabalho a um
                jantar especial — sem perder o brilho e sem exigir cuidados
                extremos.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-border bg-card p-8">
              <p className="text-[0.6875rem] uppercase tracking-[0.28em] text-muted-foreground">
                Nosso diferencial
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Cada peça passa por fundição, polimento e conferência manual
                antes de ser enviada. Vendemos em edições reduzidas para manter o
                padrão, e o atendimento é direto: a sacola é montada no site e o
                pedido é finalizado no WhatsApp, com total transparência.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <p className="text-[0.6875rem] uppercase tracking-[0.28em] text-muted-foreground">
              Time
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Base do time Imperial Silver — você pode completar os nomes e
              funções no próximo passo.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {members.map((m, i) => (
              <Reveal key={m.role} delay={i * 100}>
                <div className="flex items-center gap-4 border border-border bg-card p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-secondary">
                    <span className="font-display text-lg tracking-widest">
                      {m.initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {m.role}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground/70">
                      {m.name}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { number: "925", label: "Prata esterlina" },
            { number: "100%", label: "IMPORTADA" },
            { number: "SP", label: "Produzido em Agudos" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <div className="border border-border bg-card p-8 text-center">
                <p className="font-display text-4xl">{stat.number}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


function Reviews() {
  return (
    <section
      id="avaliacoes"
      className="scroll-mt-24 border-y border-border bg-secondary/50 py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">Avaliações</p>
          <h2 className="mt-3 text-4xl md:text-5xl">4,9 de 5 em 1.284 pedidos</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <figure className="flex h-full flex-col justify-between border border-border bg-card p-6">
                <div className="flex gap-1">
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-foreground text-foreground"
                    />
                  ))}
                </div>
                <blockquote className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-[0.16em]">
                  {r.name}
                  <span className="ml-2 text-muted-foreground normal-case tracking-normal">
                    {r.city}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-xl tracking-[0.35em]">IMPERIAL SILVER</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              Joalheria de prata esterlina 925 em edições reduzidas. Cada peça
              é polida e conferida à mão antes do envio.
            </p>
          </div>
          <div>
            <p className="text-[0.6875rem] uppercase tracking-[0.28em] text-primary-foreground/50">
              Coleção
            </p>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
              <li>
                <a href="#pulseiras" className="hover:text-primary-foreground">
                  Pulseiras
                </a>
              </li>
              <li>
                <a href="#colares" className="hover:text-primary-foreground">
                  Colares
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-primary-foreground">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary-foreground">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[0.6875rem] uppercase tracking-[0.28em] text-primary-foreground/50">
              Atendimento
            </p>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
              <li>Sab a dom, 9h às 18h</li>
              <li>Nick.Gois13@gmail.com</li>
              <li>
                <a
                  href="https://www.ImperialSilverPratas.com.br"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary-foreground"
                >
                  www.ImperialSilverPratas.com.br
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary-foreground"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Imperial Silver Joalheria</p>
          <p>Pagamento exclusivamente via WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <ProductSection
          id="pulseiras"
          eyebrow="Produtos · Pulseiras"
          title="Pulseiras"
          copy="Duas construções opostas: a corrente quase invisível e o bracelete de trama sólida. Ambas em prata 925 polida."
          category="pulseiras"
        />
        <ProductSection
          id="colares"
          eyebrow="Produtos · Colares"
          title="Colares"
          copy="Do ponto de luz discreto ao grumet de elos largos — duas maneiras de ocupar o decote."
          category="colares"
        />
        <Reviews />
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24">
          <Reveal>
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2 className="mt-3 text-4xl md:text-5xl">FAQ</h2>
          </Reveal>
          <div className="mt-10">
            <Faq />
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
      <SilverCursor />
    </CartProvider>
  );
}
