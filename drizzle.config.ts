import { defineConfig } from "drizzle-kit";

const target = process.env.DB_TARGET === "auth" ? "auth" : "app";

const env = {
  auth: { url: process.env.TURSO_AUTH_URL, token: process.env.TURSO_AUTH_TOKEN },
  app: { url: process.env.TURSO_APP_URL, token: process.env.TURSO_APP_TOKEN },
}[target];

if (!env.url) throw new Error(`Missing Turso URL for the "${target}" database.`);

export default defineConfig({
  dialect: "turso",
  schema: `./src/db/${target}.schema.ts`,
  out: `./drizzle/${target}`,
  dbCredentials: { url: env.url, authToken: env.token },
});