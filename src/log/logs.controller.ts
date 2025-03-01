import { Body, Controller, Post, Query } from '@nestjs/common';
import { LogService } from './logs.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EncryptLogDto } from './dto/encryptLog';
import { DecryptLogDto } from './dto/decryptLog';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logService: LogService) {}

  @Post('crypt')
  @ApiOperation({ summary: 'Encrypt log' })
  encryptLog(
    @Body() log: EncryptLogDto,
    @Query('secret') secret: string,
  ): string {
    return this.logService.encryptLog(log.log, secret);
  }

  @Post('decrypt')
  @ApiOperation({ summary: 'Decrypt log' })
  decryptLog(
    @Body() cryptLog: DecryptLogDto,
    @Query('secret') secret: string,
  ): Record<string, any> {
    return this.logService.decryptLog(cryptLog, secret);
  }
}
