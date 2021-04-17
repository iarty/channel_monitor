import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Channel } from '../../db/models/channels.model';

@Module({
  imports: [SequelizeModule.forFeature([Channel])],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}
