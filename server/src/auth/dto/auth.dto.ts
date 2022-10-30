import { ApiProperty, PickType } from '@nestjs/swagger';
import { Auth } from '../auth.schema';

export class ReadOnlyAuthDto extends PickType(Auth, ['email', 'name', 'isAdmin'] as const) {
  @ApiProperty({
    example: 'ab1234567890',
    description: 'id',
  })
  id: string;
}
