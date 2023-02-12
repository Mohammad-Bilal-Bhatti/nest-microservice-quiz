import { Test, TestingModule } from '@nestjs/testing';
import { UsersServiceController } from './users-service.controller';
import { UsersServiceService } from './users-service.service';

describe('UsersServiceController', () => {
  let usersServiceController: UsersServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersServiceController],
      providers: [UsersServiceService],
    }).compile();

    usersServiceController = app.get<UsersServiceController>(UsersServiceController);
  });

  describe('user::login', () => {
    it('should return access token on successful login', () => {
      const userLoginInput = {
        email: 'user@domain.com',
        password: 'Abcd@1234'
      };
      const result = usersServiceController.handleUserLogin(userLoginInput);
      expect(result).toHaveProperty('accessToken');
    });
  });

  describe('user::register', () => {
    it('user can register into the system', () => {
      const userRegistrationInput = {
        email: 'testuser@domain.com',
        password: 'Abcd@1234',
        name: 'Test User',
        age: 18,
        location: 'system',
      };
      const result = usersServiceController.handleUserRegister(userRegistrationInput);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('message', 'user registration complete');
    });
  });
});
