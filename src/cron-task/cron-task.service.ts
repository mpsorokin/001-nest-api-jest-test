import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class CronTaskService {
  private readonly logger = new Logger('cron-task-service');

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.log('Cron task runs every 10 seconds...');
  }
  @Interval(3 * 1000)
  handleInterval() {
    this.logger.log('Interval task runs every 3 seconds...');
  }
  @Timeout(5 * 1000)
  handleTimeout() {
    console.log('Timeout every 5 seconds after start');
  }
}
