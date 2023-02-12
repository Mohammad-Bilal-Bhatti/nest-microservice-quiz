import { CacheModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { Service } from "./available.services";
import { JwtStrategy } from "./strategies/jwt-strategy";
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore.redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 300, /* in seconds */
    }),
    ClientsModule.register([
      {
        name: Service.Users,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
      {
        name: Service.Flims,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  providers: [JwtStrategy],
  controllers: [],
  exports: [ClientsModule, JwtStrategy, CacheModule]
})
export class SharedModule {}