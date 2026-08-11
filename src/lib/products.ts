import type { Product } from "./cart";
import pulseira1 from "@/assets/pulseira-1.jpg";
import pulseira2 from "@/assets/pulseira-2.jpg";
import colar1 from "@/assets/colar-1.jpg";
import colar2 from "@/assets/colar-2.jpg";

export const WHATSAPP_NUMBER = "5511999999999";

export const products: Product[] = [
  {
    id: "pulseira-esferas",
    name: "Pulseira Esferas",
    category: "pulseiras",
    price: 289,
    detail:
      "Corrente fina com esferas polidas em intervalos regulares. Leve, discreta e feita para o uso diário.",
    material: "Prata 925 · 17 cm ajustável",
    image: pulseira1,
  },
  {
    id: "pulseira-trance",
    name: "Pulseira Trançada",
    category: "pulseiras",
    price: 419,
    detail:
      "Bracelete rígido de trama entrelaçada à mão, com acabamento espelhado e volume marcante.",
    material: "Prata 925 · aro 6,5 cm",
    image: pulseira2,
  },
  {
    id: "colar-ponto-luz",
    name: "Colar Ponto de Luz",
    category: "colares",
    price: 339,
    detail:
      "Corrente veneziana delicada com pingente redondo e zircônia lapidada no centro.",
    material: "Prata 925 · 42 cm + 3 cm",
    image: colar1,
  },
  {
    id: "colar-grumet",
    name: "Colar Grumet Largo",
    category: "colares",
    price: 689,
    detail:
      "Elos grumet largos com fecho embutido. Peso, brilho e presença em uma peça atemporal.",
    material: "Prata 925 · 50 cm · 11 mm",
    image: colar2,
  },
];