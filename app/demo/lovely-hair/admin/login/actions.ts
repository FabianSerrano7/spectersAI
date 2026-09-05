"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { neon } from "@neondatabase/serverless";
import { createSession } from "@/lib/auth";

const sql = neon(process.env.DATABASE_URL!);

export type LoginState = { error: string | null };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Ingresa tu correo y contraseña." };
  }

  const rows = await sql`
    SELECT email, password_hash FROM admin_users WHERE email = ${email} LIMIT 1
  `;
  const user = rows[0] as { email: string; password_hash: string } | undefined;

  if (!user) {
    return { error: "Correo o contraseña incorrectos." };
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return { error: "Correo o contraseña incorrectos." };
  }

  await createSession(user.email);
  redirect("/demo/lovely-hair/admin");
}
