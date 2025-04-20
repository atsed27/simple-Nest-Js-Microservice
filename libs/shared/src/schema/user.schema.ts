import { sql } from 'drizzle-orm';
import { pgTable, serial, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  fullName: text('full_name'),
  username: varchar('username', { length: 255 }),
  password: text('password'),
});
