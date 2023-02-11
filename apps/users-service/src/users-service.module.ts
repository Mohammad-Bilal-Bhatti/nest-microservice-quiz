import { Module } from '@nestjs/common';
import { UsersServiceController } from './users-service.controller';
import { UsersServiceService } from './users-service.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, validationSchema } from './configuration/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/users-service/.env',
      load: [configuration],
      validationSchema: validationSchema,
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: { 
            expiresIn: configService.get<string>('jwt.expiary') 
          },
        };
      }
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
          entities: [User],
          synchronize: true,
        };
      }

    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersServiceController],
  providers: [UsersServiceService, TokenService],
})
export class UsersServiceModule {}
