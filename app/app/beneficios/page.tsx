"use client";

import { Award, BookOpen, Users, Gift, Sparkles, Calendar, Package, HeartHandshake } from "lucide-react";

const beneficios = [
  { icon: Award, titulo: "Certificados", desc: "Reconhecimento oficial do seu conhecimento em cada formação concluída." },
  { icon: Sparkles, titulo: "Conteúdos antecipados", desc: "Acesso a materiais e vídeos antes do lançamento oficial." },
  { icon: Calendar, titulo: "Participação em lançamentos", desc: "Presença em eventos de apresentação de novas coleções." },
  { icon: Users, titulo: "Encontros com especialistas", desc: "Conversas e workshops com a equipe da Marken Fassi." },
  { icon: HeartHandshake, titulo: "Visitas à marca", desc: "Oportunidade de conhecer de perto o ateliê e a produção." },
  { icon: Package, titulo: "Produtos e experiências", desc: "Itens exclusivos e momentos pensados para quem faz parte da Casa." },
  { icon: BookOpen, titulo: "Materiais exclusivos", desc: "Guias, cartilhas e conteúdos de apoio para o atendimento." },
  { icon: Gift, titulo: "Convites para eventos", desc: "Participação em encontros, jantares e experiências da marca." },
  { icon: Award, titulo: "Reconhecimento editorial", desc: "Sua história pode ser destacada na seção de reconhecimento." },
];

export default function BeneficiosPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Benefícios</h1>
        <p className="text-sm text-muted mt-1">Cuidado também para quem cuida da marca</p>
      </div>

      {/* Intro */}
      <div className="card-fassi p-5">
        <p className="text-sm text-ink/80 leading-relaxed">
          A participação nas formações, encontros e ações da Casa Fassi pode dar acesso a benefícios
          pensados para valorizar quem faz parte da nossa história.
        </p>
      </div>

      {/* Lista */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {beneficios.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.titulo} className="card-fassi p-5">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Icon size={20} className="text-primary" strokeWidth={1.75} />
              </div>
              <h3 className="font-serif text-base font-semibold text-ink mb-1">{b.titulo}</h3>
              <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="card-fassi p-5 text-center">
        <p className="text-xs text-muted italic">
          Os benefícios podem variar conforme a participação nas formações e ações da Casa Fassi.
        </p>
      </div>
    </div>
  );
}
