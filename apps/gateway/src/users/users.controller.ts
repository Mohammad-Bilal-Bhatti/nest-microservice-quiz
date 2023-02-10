import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";

@Controller('users')
export class UsersController {

  @Post('register')
  async register(@Body() input: RegisterUserDto) {
    
  }

  @Post('login')
  async login(@Body() input: LoginDto) {

  }

}