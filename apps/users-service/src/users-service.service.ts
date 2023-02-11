import { Injectable } from '@nestjs/common';
import { ILogin } from './interfaces/login';
import { IRegisterUser } from './interfaces/register.user';
import { TokenService } from './token.service';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersServiceService {

  constructor(
    @InjectRepository(User)
  private usersRepository: Repository<User>,
  private tokenService: TokenService,
  ) {}

  async login(input: ILogin) {
    console.log(`${this.login.name} was called`);

    console.log(`calling UserRepository.findOneBy`);
    const user = await this.usersRepository.findOneBy({
      email: input.email,
    });

    if (!user) {
      console.warn(`Failed login attempt by email = ${input.email}`);
      throw new RpcException({ message: 'Invalid user email or password!', code: 'Auth_001' });
    }

    const passwordMatch = await bcrypt.compare(input.password, user.password);

    if (!passwordMatch) {
      console.warn(`Failed login attempt by email = ${input.email}`);
      throw new RpcException({ message: 'Invalid user email or password!', code: 'Auth_001' });
    }
    console.log(`user with id: ${user.id} logged in successful`)
    const { accessToken, refreshToken } = this.tokenService.issueToken(user);
    return { accessToken, refreshToken };
  }

  async register(input: IRegisterUser) {
    console.log(`${this.register.name} was called with: ${JSON.stringify(input)}`);

    const emailAlreadyRegistered = await this.usersRepository.findOneBy({
      email: input.email,
    });

    if (emailAlreadyRegistered) {
      throw new RpcException({ message: 'user already registered with this email', code: 'User_001' })
    }

    const saltOrRounds = 10;
    input.password = await bcrypt.hash(input.password, saltOrRounds); /* hash user password */

    const user = new User();
    Object.assign(user, input);

    await this.usersRepository.save(user);

    return { message: 'user registration complete' };
  }
}
