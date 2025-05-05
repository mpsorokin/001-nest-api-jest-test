import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class CronTaskService {
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    console.log('Cron task runs every 10 seconds...');
  }

  @Interval(3 * 1000)
  handleInterval() {
    console.log('Interval task runs every 3 seconds...');
  }
}
