import { cursos } from "@/lib/cursos";
import AulaClient from "./AulaClient";

export function generateStaticParams() {
  return cursos.flatMap((c) =>
    c.modulos.flatMap((m) =>
      m.aulas.map((a) => ({ aulaId: a.id }))
    )
  );
}

export default function Page() {
  return <AulaClient />;
}
