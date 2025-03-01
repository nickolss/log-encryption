import { ApiProperty } from '@nestjs/swagger';

export class EncryptLogDto {
  @ApiProperty({
    description: 'Log to be encrypt',
    type: Object,
    default: {
      timestamp: '2000-10-10',
      userId: 123,
      action: 'login',
      details: 'fake log entry',
    },
  })
  log: Record<string, any>;

  secretKey: string;
}
