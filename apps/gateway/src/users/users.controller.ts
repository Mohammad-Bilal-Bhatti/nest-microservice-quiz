import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Service } from "../shared/available.services";
import { LoginDto } from "./dtos/login.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";

@Controller('users')
export class UsersController {

  constructor(@Inject(Service.Users) private readonly userService: ClientProxy) {}

  @Post('register')
  async register(@Body() input: RegisterUserDto) {
    return this.userService.send('user::register', input);
  }

  @Post('login')
  async login(@Body() input: LoginDto) {
    return this.userService.send('user::login', input);
  }

}