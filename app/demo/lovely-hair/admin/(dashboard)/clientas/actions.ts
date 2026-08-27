"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/client";
import { clientas } from "@/lib/db/schema";
import { getReservasDeClienta, type ReservaClienta } from "@/lib/db/queries";

export async function obtenerHistorialClienta(clienteId: string): Promise<ReservaClienta[]> {
  return getReservasDeClienta(clienteId);
}

export async function actualizarCumpleanos(
  id: string,
  dia: number | null,
  mes: number | null,
  ano: number | null,
): Promise<{ error: string | null }> {
  if (dia === null || mes === null) {
    if (dia !== null || mes !== null) {
      return { error: "Falta el día o el mes." };
    }
  } else {
    if (!Number.isInteger(dia) || dia < 1 || dia > 31) return { error: "Día inválido." };
    if (!Number.isInteger(mes) || mes < 1 || mes > 12) return { error: "Mes inválido." };
  }
  const anoActual = new Date().getFullYear();
  if (ano !== null && (!Number.isInteger(ano) || ano < 1900 || ano > anoActual)) {
    return { error: "Año inválido." };
  }

  await db
    .update(clientas)
    .set({ cumpleDia: dia, cumpleMes: mes, cumpleAno: ano, updatedAt: new Date() })
    .where(eq(clientas.id, id));

  revalidatePath("/demo/lovely-hair/admin/clientas");
  revalidatePath("/demo/lovely-hair/admin");
  return { error: null };
}
