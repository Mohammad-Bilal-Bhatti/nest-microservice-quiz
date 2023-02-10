import { Module } from '@nestjs/common';
import { FlimsServiceController } from './flims-service.controller';
import { FlimsServiceService } from './flims-service.service';

@Module({
  imports: [],
  controllers: [FlimsServiceController],
  providers: [FlimsServiceService],
})
export class FlimsServiceModule {}
