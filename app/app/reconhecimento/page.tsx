"use client";

import { Award, Heart, Lightbulb, Users, BookOpen, Camera } from "lucide-react";

const categorias = [
  {
    icon: Camera,
    titulo: "Vitrine que inspira",
    desc: "Composições que traduzem o cuidado da Marken Fassi em cada detalhe.",
    destaque: "Loja Enxoval Real — RJ",
    destaqueDesc: "Composição com a Coleção Alameda que transformou a vitrine em um ambiente acolhedor.",
  },
  {
    icon: Heart,
    titulo: "História de atendimento",
    desc: "Momentos em que o conhecimento sobre o produto fez a diferença.",
    destaque: "Vendedora Carla Souza — MG",
    destaqueDesc: "Atendeu uma cliente que buscava um enxoval de casamento e, com repertório sobre tecidos, indicou a combinação perfeita.",
  },
  {
    icon: Lightbulb,
    titulo: "Ideia que aproxima",
    desc: "Iniciativas criativas que aproximaram a marca dos clientes.",
    destaque: "Loja Casa & Estilo — SP",
    destaqueDesc: "Criou um evento de chá da tarde na loja para apresentar a nova coleção com toque e sensorialidade.",
  },
  {
    icon: Users,
    titulo: "Parceiro da Casa",
    desc: "Quem se dedica a levar o bem-viver para mais casas.",
    destaque: "Representante Rodrigo Mendes",
    destaqueDesc: "Acompanha cada loja parceira com atenção personalizada e compartilha boas práticas com toda a rede.",
  },
  {
    icon: BookOpen,
    titulo: "Especialista da coleção",
    desc: "Quem dominou os detalhes de cada coleção e orienta clientes com segurança.",
    destaque: "Em breve",
    destaqueDesc: "Reconhecimento para quem conclui todas as formações de uma coleção específica.",
  },
  {
    icon: Award,
    titulo: "Experiência do mês",
    desc: "Um destaque a cada mês para uma história que merece ser contada.",
    destaque: "Em breve",
    destaqueDesc: "A cada mês, uma nova história será compartilhada aqui.",
  },
];

export default function ReconhecimentoPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Histórias que inspiram a Casa Fassi</h1>
        <p className="text-sm text-muted mt-1">Reconhecimento para quem cuida da marca</p>
      </div>

      {/* Intro */}
      <div className="card-fassi p-5">
        <p className="text-sm text-ink/80 leading-relaxed">
          Mais do que números, queremos reconhecer pessoas, ideias e experiências que traduzem o
          cuidado da Marken Fassi em cada atendimento. O reconhecimento considera conhecimento,
          criatividade, atendimento, participação e cuidado com a marca.
        </p>
      </div>

      {/* Categorias */}
      <div className="grid md:grid-cols-2 gap-4">
        {categorias.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.titulo} className="card-fassi p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="font-serif text-base font-semibold text-ink">{c.titulo}</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-3">{c.desc}</p>
              <div className="pt-3 border-t border-line">
                <div className="text-xs font-semibold text-ink">{c.destaque}</div>
                <p className="text-xs text-muted mt-1 leading-relaxed">{c.destaqueDesc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted text-center italic">
        Não exibimos uma classificação pública do melhor para o pior. Cada história é única e merece
        ser reconhecida.
      </p>
    </div>
  );
}
