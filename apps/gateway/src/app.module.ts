import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration, validationSchema } from './configuration/configuration';
import { FilmsModule } from './flims/flims.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/gateway/.env',
      load: [configuration],
      validationSchema: validationSchema,
      isGlobal: true,
    }),
    SharedModule, 
    UserModule, 
    FilmsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
