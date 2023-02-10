import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './flims/flims.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [SharedModule, UserModule, FilmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
