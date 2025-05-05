import { LoggerService, LogLevel } from '@nestjs/common';
import { join } from 'path';

export class CustomLogger implements LoggerService {
  private readonly logFile = join(__dirname, `../../logs/custom.log`);

  private writeToFile(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    const time = new Date().toISOString();
    const log = `[${time}] [${level}] ${context ? context : ''} ${message}  ${trace ? `\nTRACE: ${trace}` : ''}`;
  }
}
