import { Body, Controller, HttpException, HttpStatus, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError } from "rxjs";
import { Service } from "../shared/available.services";
import { LoginDto } from "./dtos/login.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { ErrorCodes } from "./error.codes";

@Controller('users')
export class UsersController {

  constructor(@Inject(Service.Users) private readonly userService: ClientProxy) {}

  @Post('register')
  async register(@Body() input: RegisterUserDto) {
    return this.userService.send('user::register', input).pipe(
      catchError( error => {
        console.log('error is encountered: ', error);
        if (error.code === ErrorCodes.Email_Already_Registered)
          throw new HttpException(error.message, HttpStatus.PRECONDITION_FAILED);
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      })
    );
  }

  @Post('login')
  async login(@Body() input: LoginDto) {
    return this.userService.send('user::login', input).pipe(
      catchError( error => {
        if (error.code === ErrorCodes.Invalid_Email_Or_Password)
          throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      })
    );
  }

}