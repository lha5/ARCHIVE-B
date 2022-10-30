import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserRequesetDto } from './dto/user.request.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.userModel.exists({ email });
    return result._id ? true : false;
  }

  async create(user: UserRequesetDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
