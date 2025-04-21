import { sql } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  numeric,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { products } from './prodct.schema';

export const orders = pgTable('orders', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  userId: uuid('userId').references(() => users.id, {
    onDelete: 'set null',
  }),

  productId: uuid('productId').references(() => products.id, {
    onDelete: 'set null',
  }),

  quantity: integer('quantity').notNull().default(1),

  totalPrice: numeric('total_price', { precision: 10, scale: 2 }).notNull(),

  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
