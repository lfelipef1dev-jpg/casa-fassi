import { modulos } from "@/lib/universidade";
import ModuloClient from "./ModuloClient";

export function generateStaticParams() {
  return modulos.map((m) => ({ moduloId: m.id }));
}

export default function ModuloPage() {
  return <ModuloClient />;
}
