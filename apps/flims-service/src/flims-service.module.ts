import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration, validationSchema } from './configuration/configuration';
import { Flim } from './entities/flim.entity';
import { FlimsServiceController } from './flims-service.controller';
import { FlimsServiceService } from './flims-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/flims-service/.env',
      load: [configuration],
      validationSchema: validationSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<'mysql'|'mssql'|'postgres'>('database.type'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.pass'),
          database: configService.get<string>('database.name'),
          entities: [Flim],
          synchronize: true,
        };
      }
    }),
    TypeOrmModule.forFeature([Flim])
  ],
  controllers: [FlimsServiceController],
  providers: [FlimsServiceService],
})
export class FlimsServiceModule {}
