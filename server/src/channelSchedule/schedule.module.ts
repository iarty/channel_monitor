import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksService } from './schedule.service';
import { Channel } from 'db/models/channels.model';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forFeature([Channel]),
    HttpModule,
  ],
  providers: [TasksService],
})
export class SchModule {}
