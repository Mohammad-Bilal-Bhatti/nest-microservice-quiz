import { Injectable } from '@nestjs/common';
import { ILogin } from './interfaces/login';
import { IRegisterUser } from './interfaces/register.user';

@Injectable()
export class UsersServiceService {
  login(input: ILogin) {
    console.log(`${this.login.name} was called with: ${JSON.stringify(input)}`);
    return { accessToken: 'access-token', refreshToken: 'refresh-token' };
  }

  register(input: IRegisterUser) {
    console.log(`${this.register.name} was called with: ${JSON.stringify(input)}`);
    return { message: 'user registration complete' };
  }
}
