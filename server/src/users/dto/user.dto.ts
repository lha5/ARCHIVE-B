import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../user.schema';

export class ReadOnlyUserDto extends PickType(User, ['email', 'name', 'isAdmin'] as const) {
  @ApiProperty({
    example: 'ab1234567890',
    description: 'id',
  })
  id: string;
}
