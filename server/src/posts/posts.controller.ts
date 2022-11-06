import { Controller, Post, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { PostsService } from './posts.service';
import { multerOptions } from './../common/utils/multer.options';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from './../users/users.schema';

@Controller('posts')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '로그 업로드' })
  @UseInterceptors(FileInterceptor('image', multerOptions('pic')))
  @UseGuards(JwtAuthGuard)
  @Post()
  uploadImage(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: User) {
    return this.postsService.uploadImage(user, file);
  }
}
