import { Controller, Get } from '@nestjs/common';
import { FlimsServiceService } from './flims-service.service';

@Controller()
export class FlimsServiceController {
  constructor(private readonly flimsServiceService: FlimsServiceService) {}

  @Get()
  getHello(): string {
    return this.flimsServiceService.getHello();
  }
}
