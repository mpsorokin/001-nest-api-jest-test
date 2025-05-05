import { Module } from '@nestjs/common';
import { CronTaskService } from './cron-task.service';
import { CronTaskController } from './cron-task.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [CronTaskController],
  providers: [CronTaskService],
})
export class CronTaskModule {}
