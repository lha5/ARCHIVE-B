import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';

@Controller('posts')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class PostsController {}
