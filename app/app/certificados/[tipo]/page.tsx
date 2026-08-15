import CertificadoClient from "./CertificadoClient";

export function generateStaticParams() {
  return [
    { tipo: "produto" },
    { tipo: "vendas" },
    { tipo: "master" },
  ];
}

export default function Page() {
  return <CertificadoClient />;
}
