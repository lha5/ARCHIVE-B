import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { SignInRequestDto } from './dto/signin.request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository, private jwtService: JwtService) {}

  async jwtSignIn(data: SignInRequestDto) {
    const { email, password } = data;

    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Please check email and password again.');
    }

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Please check email and password again.');
    }

    const payload = { email: email, sub: user.id };

    return { token: this.jwtService.sign(payload, { secret: process.env.SECRET_KEY }) };
  }
}
