import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flim } from './entities/flim.entity';
import { FlimsServiceController } from './flims-service.controller';
import { FlimsServiceService } from './flims-service.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'flims_db',
      entities: [Flim],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Flim])
  ],
  controllers: [FlimsServiceController],
  providers: [FlimsServiceService],
})
export class FlimsServiceModule {}
