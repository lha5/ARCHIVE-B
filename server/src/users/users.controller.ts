import { Body, Controller, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { UsersService } from './users.service';
import { AuthService } from './../auth/auth.service';
import { SignInRequestDto } from './../auth/dto/signin.request.dto';
import { UserRequesetDto } from './dto/user.request.dto';
import { ReadOnlyUserDto } from './dto/user.dto';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

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
  @Post('signup')
  async signUp(@Body() body: UserRequesetDto) {
    return await this.userService.signUp(body);
  }

  @ApiResponse({
    status: 401,
    description: 'Authorized error',
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ReadOnlyUserDto,
  })
  @ApiOperation({ summary: '로그인' })
  @Post('signin')
  async signIn(@Body() data: SignInRequestDto) {
    return this.authService.jwtSignIn(data);
  }
}
