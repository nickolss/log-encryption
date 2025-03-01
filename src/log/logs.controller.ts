import { Body, Controller, Post, Query } from '@nestjs/common';
import { LogService } from './logs.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EncryptLogDto } from './dto/encryptLog';
import { DecryptLogDto } from './dto/decryptLog';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logService: LogService) {}

  @Post('crypt')
  @ApiOperation({ summary: 'Encrypt log' })
  @ApiResponse({
    status: 200,
    description: 'Log successfully encrypted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid data provided',
  })
  encryptLog(
    @Body() log: EncryptLogDto,
    @Query('secret') secret: string,
  ): string {
    return this.logService.encryptLog(log.log, secret);
  }

  @Post('decrypt')
  @ApiOperation({ summary: 'Decrypt log' })
  @ApiResponse({
    status: 200,
    description: 'Log successfullt decrypted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid data provided',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid secret key provided or corrupted log',
  })
  decryptLog(
    @Body() cryptLog: DecryptLogDto,
    @Query('secret') secret: string,
  ): Record<string, any> {
    return this.logService.decryptLog(cryptLog, secret);
  }
}
