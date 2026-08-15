import { cursos } from "@/lib/cursos";
import CursoClient from "./CursoClient";

export function generateStaticParams() {
  return cursos.map((c) => ({ cursoId: c.id }));
}

export default function Page() {
  return <CursoClient />;
}
