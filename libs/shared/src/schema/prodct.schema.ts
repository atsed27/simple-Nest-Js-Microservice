import { sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  uuid,
  varchar,
  boolean,
  numeric,
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }),
  availability: boolean('availability'),
  category: varchar('category', { length: 255 }),
});
