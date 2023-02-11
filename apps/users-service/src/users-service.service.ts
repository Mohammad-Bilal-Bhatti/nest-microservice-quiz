import { Injectable } from '@nestjs/common';
import { ILogin } from './interfaces/login';
import { IRegisterUser } from './interfaces/register.user';
import { IUser } from './interfaces/user.out';
import { TokenService } from './token.service';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersServiceService {

  constructor(private tokenService: TokenService) {}

  async login(input: ILogin) {
    console.log(`${this.login.name} was called with: ${JSON.stringify(input)}`);

    // TODO: find user by email.
    const user: IUser = {
      id: 1,
      name: 'Jhon',
      age: 30,
      email: 'jhon@domain.com',
      password: '$2a$10$X4lgbN/Z3hLCT/wwFYgCEOt1yElTz/Rw91afnZ1a0BI4k.eII200G',
      location: 'california'
    };

    if (!user) {
      console.warn(`Failed login attempt on email = ${input.email}`);
      throw new RpcException({ message: 'Invalid user email or password!', code: 'Auth_001' });
    }

    // TODO: validate user password.
    const passwordMatch = await bcrypt.compare(input.password, user.password);

    if (!passwordMatch) {
      console.warn(`Failed login attempt on email = ${input.email}`);
      throw new RpcException({ message: 'Invalid user email or password!', code: 'Auth_001' });
    }

    const { accessToken, refreshToken } = this.tokenService.issueToken(user);
    return { accessToken, refreshToken };
  }

  async register(input: IRegisterUser) {
    console.log(`${this.register.name} was called with: ${JSON.stringify(input)}`);

    const saltOrRounds = 10;
    input.password = await bcrypt.hash(input.password, saltOrRounds); /* hash user password */

    // TODO: save user into database

    return { message: 'user registration complete' };
  }
}
