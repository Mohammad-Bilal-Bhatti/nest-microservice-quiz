import { Module } from '@nestjs/common';
import { UsersServiceController } from './users-service.controller';
import { UsersServiceService } from './users-service.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwt-secret', /* TODO: use config service here */
      signOptions: { expiresIn: '1d' }, /* default expiary of issued token */
    }),
  ],
  controllers: [UsersServiceController],
  providers: [UsersServiceService, TokenService],
})
export class UsersServiceModule {}
