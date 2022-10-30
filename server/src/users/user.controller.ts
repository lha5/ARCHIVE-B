import { Body, Controller, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { UserService } from './user.service';
import { UserRequesetDto } from './dto/user.request.dto';
import { ReadOnlyUserDto } from './dto/user.dto';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ReadOnlyUserDto,
  })
  @ApiOperation({ summary: '회원 가입' })
  @Post()
  async signUp(@Body() body: UserRequesetDto) {
    return await this.userService.signUp(body);
  }
}
