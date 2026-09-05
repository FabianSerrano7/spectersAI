import { getClientasEnriquecidas } from "@/lib/db/queries";
import { resolvePeriod } from "@/lib/date-range";
import { PageHeader } from "../../ui";
import ClientasTable from "./ClientasTable";
import DistribucionMatrix from "./DistribucionMatrix";

export default async function ClientasPage({
  searchParams,
}: {
  searchParams: Promise<{ nivel?: string; estado?: string; preset?: string; desde?: string; hasta?: string }>;
}) {
  const [clientas, params] = await Promise.all([getClientasEnriquecidas(), searchParams]);
  const period = resolvePeriod(params);

  return (
    <div>
      <PageHeader
        eyebrow="Clientas"
        title={`${clientas.length.toLocaleString("es-CL")} clientas`}
        subtitle="Nombre, contacto y cumpleaños de cada una, con su nivel de uso y estado. Filtra por Power/En fuga/etc. para armar una lista de contacto."
      />
      <DistribucionMatrix
        period={period}
        dateParams={{ preset: params.preset, desde: params.desde, hasta: params.hasta }}
        abierta={!!(params.nivel || params.estado || params.preset || params.desde)}
      />
      <ClientasTable clientas={clientas} initialNivel={params.nivel ?? null} initialEstado={params.estado ?? null} />
    </div>
  );
}
