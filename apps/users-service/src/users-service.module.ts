import { Module } from '@nestjs/common';
import { UsersServiceController } from './users-service.controller';
import { UsersServiceService } from './users-service.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwt-secret', /* TODO: use config service here */
      signOptions: { expiresIn: '1d' }, /* default expiary of issued token */
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'users_db',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersServiceController],
  providers: [UsersServiceService, TokenService],
})
export class UsersServiceModule {}
