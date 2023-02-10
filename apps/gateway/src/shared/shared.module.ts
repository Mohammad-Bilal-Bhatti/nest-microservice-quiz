import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { Service } from "./available.services";

@Module({
  imports: [
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
  providers: [],
  controllers: [],
  exports: [ClientsModule]
})
export class SharedModule {}