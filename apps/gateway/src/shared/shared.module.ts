import { CacheModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { Service } from "./available.services";
import { JwtStrategy } from "./strategies/jwt-strategy";
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [

    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore.redisStore,
        host: configService.get<string>('cache.host'),
        port: configService.get<string>('cache.port'),
        ttl: configService.get<number>('cache.ttl'),  
      })
    }),
    ClientsModule.registerAsync([
      {
        name: Service.Users,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const mqHost = configService.get<string>('mq.host');
          const mqPort = configService.get<number>('mq.port');
          return {
            transport: Transport.REDIS,
            options: {
              host: mqHost,
              port: mqPort,
            },
          }
        }
      },
      {
        name: Service.Flims,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const mqHost = configService.get<string>('mq.host');
          const mqPort = configService.get<number>('mq.port');
          return {
            transport: Transport.REDIS,
            options: {
              host: mqHost,
              port: mqPort,
            },
          }
        }
      },
    ])
  ],
  providers: [JwtStrategy],
  controllers: [],
  exports: [ClientsModule, JwtStrategy, CacheModule]
})
export class SharedModule {}