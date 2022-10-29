import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './auth.schema';
import { AuthRequestDto } from './dto/auth.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private readonly authModel: Model<Auth>) {}

  async signUp(body: AuthRequestDto) {
    const { email, name, password } = body;

    const isExist = await this.authModel.exists({ email });

    if (isExist) {
      throw new UnauthorizedException('This email is already exist.');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const auth = await this.authModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return auth.readOnlyData;
  }
}
