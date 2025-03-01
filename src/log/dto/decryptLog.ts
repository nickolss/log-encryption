import { ApiProperty } from '@nestjs/swagger';

export class DecryptLogDto {
  @ApiProperty({
    description: 'Encrypted log to be decrypted',
    type: String,
    default: 'qweurshdfksadhfgwqjher...',
  })
  encryptedLog: string;

  secretKey: string;
}
