"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { ingestArchivos, type IngestResumen } from "@/lib/import/ingest";

export type UploadState =
  | { status: "idle" }
  | { status: "error"; error: string }
  | { status: "ok"; resumen: IngestResumen };

const initialState: UploadState = { status: "idle" };
export { initialState as uploadInitialState };

export async function uploadAction(
  _prev: UploadState,
  formData: FormData,
): Promise<UploadState> {
  const session = await getSession();
  if (!session) return { status: "error", error: "Sesión expirada, vuelve a entrar." };

  const reservasFile = formData.get("reservas") as File | null;
  const listadoFile = formData.get("listado") as File | null;

  if (!reservasFile || reservasFile.size === 0) {
    return { status: "error", error: "Falta el archivo de historial de reservas." };
  }

  try {
    const resumen = await ingestArchivos({
      reservasBuffer: await reservasFile.arrayBuffer(),
      listadoBuffer: listadoFile && listadoFile.size > 0 ? await listadoFile.arrayBuffer() : null,
      uploadedBy: session.email,
    });
    revalidatePath("/demo/lovely-hair/admin");
    return { status: "ok", resumen };
  } catch (e) {
    return { status: "error", error: e instanceof Error ? e.message : "Error al procesar los archivos." };
  }
}
