import { Body, Controller, Post } from '@nestjs/common';
import { LogService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logService: LogService) {}
  @Post('crypt')
  encryptLog(@Body() log: Record<string, any>): string {
    return this.logService.encryptLog(log);
  }

  @Post('decrypt')
  decryptLog(@Body() cryptLog: Record<string, string>): Record<string, any> {
    return this.logService.decryptLog(cryptLog);
  }
}
