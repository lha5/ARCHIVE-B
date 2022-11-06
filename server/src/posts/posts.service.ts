import { Injectable } from '@nestjs/common';
import { UsersRepository } from './../users/users.repository';
import { User } from './../users/users.schema';

@Injectable()
export class PostsService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async uploadImage(user: User, file: Express.Multer.File) {
    const fileName = `pic/${file[0].filename}`;

    // const newPost = await this.postsRepository.findByIdAndUploadImage(user.id, fileName);
    // return newPost;
  }
}
