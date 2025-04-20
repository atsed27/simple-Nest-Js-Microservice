import { defineConfig } from 'drizzle-kit';
import postgres from 'postgres';

const sql = postgres({
  ssl: {
    rejectUnauthorized: false,
  },
});

export default defineConfig({
  schema: './libs/shared/src/**/*.schema.ts',
  schemaFilter: ['public'],
  dialect: 'postgresql',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
