import { PickType } from '@nestjs/swagger';
import { User } from '../user.schema';

export class UserRequesetDto extends PickType(User, ['email', 'password', 'name', 'isAdmin'] as const) {}
