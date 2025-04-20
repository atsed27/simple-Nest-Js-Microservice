import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';

export const DRIZZLE = Symbol('drizzle-connection');
@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const client = postgres(configService.get<string>('DATABASE_URL'), {
          prepare: false,
        });
        const db = drizzle(client);
        return db;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
