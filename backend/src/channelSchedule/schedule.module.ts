import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksService } from './schedule.service';
import { Channel } from 'db/models/channels.model';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forFeature([Channel]),
    HttpModule,
    TelegramModule,
  ],
  providers: [TasksService],
})
export class SchModule {}
