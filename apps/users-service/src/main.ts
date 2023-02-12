import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersServiceModule } from './users-service.module';

async function bootstrap() {

  const appContext = await NestFactory.createApplicationContext(UsersServiceModule);
  const configService = appContext.get<ConfigService>(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersServiceModule, {
    transport: Transport.REDIS,
    options: {
      host: configService.get<string>('mq.host'),
      port: configService.get<number>('mq.port'),
    },
  });
  await app.listen();
}
bootstrap();
