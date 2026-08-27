// Siembra (o actualiza) el usuario admin del panel de Lovely Hair.
// Uso: DATABASE_URL=... node scripts/seed-admin.mjs <email> <password>
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const [, , email, password] = process.argv;
if (!email || !password) {
  console.error("Uso: node scripts/seed-admin.mjs <email> <password>");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const hash = await bcrypt.hash(password, 12);

await sql`
  INSERT INTO admin_users (email, password_hash)
  VALUES (${email}, ${hash})
  ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
`;

console.log(`OK: usuario admin listo -> ${email}`);
