import { Body, Controller, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth.request.dto';

@Controller('auth')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signUp(@Body() body: AuthRequestDto) {
    return await this.authService.signUp(body);
  }
}
