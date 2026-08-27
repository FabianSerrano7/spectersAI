import { getServiciosCatalogo, getCategoriasServicios } from "@/lib/db/queries";
import { PageHeader } from "../../ui";
import ServiciosTable from "./ServiciosTable";
import SyncButton from "./SyncButton";

export default async function ServiciosPage() {
  const [servicios, categoriasReservas] = await Promise.all([
    getServiciosCatalogo(),
    getCategoriasServicios(),
  ]);
  const categorias = categoriasReservas.length
    ? categoriasReservas
    : ["Color", "Corte", "Pack/Promo", "Alisado/Botox", "Tratamiento", "Peinado y lavado", "Uñas, maquillaje y otros", "Otros"];

  return (
    <div>
      <PageHeader
        eyebrow="Catálogo"
        title="Catálogo, precio y costo"
        subtitle="El costo no viene de ningún export de AgendaPro — se carga acá a mano. Utilidad y margen se calculan solos."
      />
      <div className="mb-4">
        <SyncButton />
      </div>
      <ServiciosTable servicios={servicios} categorias={categorias} />
    </div>
  );
}
