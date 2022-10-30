import { UsersRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRequesetDto } from './dto/user.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(body: UserRequesetDto) {
    const { email, name, password, isAdmin } = body;

    const isExist = await this.usersRepository.existsByEmail(email);

    if (isExist) {
      throw new UnauthorizedException('This email is already exist.');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const auth = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      isAdmin,
    });

    return auth.readOnlyData;
  }
}
