import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { IUser } from "./interfaces/user.out";

export enum TokenType {
  Access = 'access',
  Refresh = 'refresh'
}

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  issueToken(user: IUser): { accessToken: string } {

    const accessToken = this.jwtService.sign({
      user_id: user.id,
      email: user.email,
      name: user.name,
      age: user.age,
      type: TokenType.Access
    }, {
      issuer: '@user.service',
      subject: user.email,
    });

    return { accessToken };
  }

  isValidToken(token: string) {
    return this.jwtService.verify(token);
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

}