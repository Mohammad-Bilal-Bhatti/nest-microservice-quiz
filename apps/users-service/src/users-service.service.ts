import { Injectable, Logger } from '@nestjs/common';
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

  private logger = new Logger(UsersServiceService.name);

  constructor(
    @InjectRepository(User)
  private usersRepository: Repository<User>,
  private tokenService: TokenService,
  ) {}

  async login(input: ILogin) {
    this.logger.log(`${this.login.name} was called`);

    this.logger.log(`calling UserRepository.findOneBy`);
    const user = await this.usersRepository.findOneBy({
      email: input.email,
    });

    if (!user) {
      this.logger.warn(`Failed login attempt by email = ${input.email}`);
      throw new RpcException({ message: 'Invalid user email or password!', code: 'Auth_001' });
    }

    const passwordMatch = await bcrypt.compare(input.password, user.password);

    if (!passwordMatch) {
      this.logger.warn(`Failed login attempt by email = ${input.email}`);
      throw new RpcException({ message: 'Invalid user email or password!', code: 'Auth_001' });
    }
    this.logger.log(`user with id: ${user.id} logged in successful`)
    const { accessToken } = this.tokenService.issueToken(user);
    return { accessToken };
  }

  async register(input: IRegisterUser) {
    this.logger.log(`${this.register.name} was called`);

    const emailAlreadyRegistered = await this.usersRepository.findOneBy({
      email: input.email,
    });

    if (emailAlreadyRegistered) {
      throw new RpcException({ message: 'user already registered with this email', code: 'User_001' })
    }

    const saltOrRounds = 10;
    input.password = await bcrypt.hash(input.password, saltOrRounds); /* hash user password */
    this.logger.log('hashed user password before storing');

    const user = new User();
    Object.assign(user, input);

    await this.usersRepository.save(user);
    this.logger.log(`user information stored into database`);

    return { message: 'user registration complete' };
  }
}
