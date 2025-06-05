import { defineConfig } from 'drizzle-kit';
import { config } from "@dotenvx/dotenvx";

config({ path: ".env", override: true });

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.SUPABASE_URL!,
    },
});
