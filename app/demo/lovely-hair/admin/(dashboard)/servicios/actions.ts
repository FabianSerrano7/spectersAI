"use server";

import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/client";
import { serviciosCatalogo } from "@/lib/db/schema";
import { sincronizarServiciosDesdeReservas } from "@/lib/db/queries";

export type ServicioInput = {
  nombre: string;
  categoria: string;
  tallas: string[];
  precio: number;
  costo: number;
};

export async function guardarServicio(
  id: number | null,
  input: ServicioInput,
): Promise<{ error: string | null }> {
  const nombre = input.nombre.trim();
  if (!nombre) return { error: "Falta el nombre." };

  const valores = {
    nombre,
    categoria: input.categoria.trim() || "Otros",
    tallas: input.tallas,
    precio: String(Math.round(input.precio) || 0),
    costo: String(Math.round(input.costo) || 0),
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(serviciosCatalogo).set(valores).where(eq(serviciosCatalogo.id, id));
  } else {
    await db.insert(serviciosCatalogo).values(valores).onConflictDoUpdate({
      target: serviciosCatalogo.nombre,
      set: valores,
    });
  }

  revalidatePath("/demo/lovely-hair/admin/servicios");
  return { error: null };
}

export async function actualizarPrecioCosto(
  id: number,
  precio: number,
  costo: number,
): Promise<{ error: string | null }> {
  await db
    .update(serviciosCatalogo)
    .set({
      precio: String(Math.round(precio) || 0),
      costo: String(Math.round(costo) || 0),
      updatedAt: new Date(),
    })
    .where(eq(serviciosCatalogo.id, id));
  revalidatePath("/demo/lovely-hair/admin/servicios");
  revalidatePath("/demo/lovely-hair/admin/metricas-servicios");
  return { error: null };
}

export async function deleteServicio(id: number) {
  if (!id) return;
  await db.delete(serviciosCatalogo).where(eq(serviciosCatalogo.id, id));
  revalidatePath("/demo/lovely-hair/admin/servicios");
}

export async function eliminarServicios(ids: number[]) {
  if (ids.length === 0) return;
  await db.delete(serviciosCatalogo).where(inArray(serviciosCatalogo.id, ids));
  revalidatePath("/demo/lovely-hair/admin/servicios");
}

export async function sincronizarCatalogo(): Promise<{ agregados: number }> {
  const agregados = await sincronizarServiciosDesdeReservas();
  revalidatePath("/demo/lovely-hair/admin/servicios");
  return { agregados };
}
