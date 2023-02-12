import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ILogin } from './interfaces/login';
import { IRegisterUser } from './interfaces/register.user';
import { UsersServiceService } from './users-service.service';

@Controller()
export class UsersServiceController {
  constructor(private readonly service: UsersServiceService) {}

  @MessagePattern('user::login')
  handleUserLogin(@Payload() input: ILogin) {
    return this.service.login(input);
  }

  @MessagePattern('user::register')
  handleUserRegister(@Payload() input: IRegisterUser) {
    return this.service.register(input);
  }
}
