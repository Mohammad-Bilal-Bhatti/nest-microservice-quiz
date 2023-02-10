import { Injectable } from '@nestjs/common';

@Injectable()
export class FlimsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
