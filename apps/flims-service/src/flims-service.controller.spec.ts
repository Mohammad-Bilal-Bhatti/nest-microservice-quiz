import { Test, TestingModule } from '@nestjs/testing';
import { FlimsServiceController } from './flims-service.controller';
import { FlimsServiceService } from './flims-service.service';

describe('FlimsServiceController', () => {
  let flimsServiceController: FlimsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FlimsServiceController],
      providers: [FlimsServiceService],
    }).compile();

    flimsServiceController = app.get<FlimsServiceController>(FlimsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(flimsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
