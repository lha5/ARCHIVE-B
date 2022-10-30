import { Body, Controller, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth.request.dto';
import { ReadOnlyAuthDto } from './dto/auth.dto';

@Controller('auth')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ReadOnlyAuthDto,
  })
  @ApiOperation({ summary: '회원 가입' })
  @Post()
  async signUp(@Body() body: AuthRequestDto) {
    return await this.authService.signUp(body);
  }
}
