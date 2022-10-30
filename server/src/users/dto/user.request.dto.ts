import { PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class UserRequesetDto extends PickType(User, ['email', 'password', 'name', 'isAdmin'] as const) {}
