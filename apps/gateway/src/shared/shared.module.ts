import { CacheModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { Service } from "./available.services";
import { JwtStrategy } from "./strategies/jwt-strategy";

@Module({
  imports: [
    CacheModule.register(),
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