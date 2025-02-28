import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogService } from './logs.service';

@Module({
  controllers: [LogsController],
  providers: [LogService],
})
export class LogsModule {}
