import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ILogin } from './interfaces/login';
import { IRegisterUser } from './interfaces/register.user';
import { UsersServiceService } from './users-service.service';

@Controller()
export class UsersServiceController {
  constructor(private readonly service: UsersServiceService) {}

  @MessagePattern('user::login')
  handleUpdateUser(@Payload() input: ILogin) {
    return this.service.login(input);
  }

  @MessagePattern('user::register')
  handleCreateUser(@Payload() input: IRegisterUser) {
    return this.service.register(input);
  }
}
