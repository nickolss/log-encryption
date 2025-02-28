import { ApiProperty } from '@nestjs/swagger';

export class EncryptLogDto {
  @ApiProperty({
    description: 'Log to be encrypt',
    type: Object,
  })
  log: Record<string, any>;
}
