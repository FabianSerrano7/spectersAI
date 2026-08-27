import { PageHeader } from "../../ui";
import UploadForm from "./UploadForm";

export default function UploadPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Subir datos"
        title="Cargar el export mensual de AgendaPro"
        subtitle="Sube el historial de reservas cada mes. El sistema evita duplicar lo que ya estaba cargado, así que puedes volver a subir el mismo archivo sin miedo."
      />
      <UploadForm />
    </div>
  );
}
