import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateChannelDto, EditChannelDto } from 'db/models/channels.dto';
import { ChannelsService } from './channels.service';

@Controller('/channels')
export class ChannelsController {
  constructor(private channelService: ChannelsService) {}

  @Get('/all')
  getChannels() {
    return this.channelService.getChannels();
  }

  @Get('/:id')
  getChannelById(@Param('id') id: string) {
    return this.channelService.getChannelById(id);
  }

  @Post()
  addChannel(@Body() dto: CreateChannelDto) {
    return this.channelService.addChannel(dto);
  }

  @Delete('/channels')
  deleteChannel(@Param('id') id: string) {
    return this.channelService.deleteChannel(id);
  }

  @Put('/channels')
  editChannel(@Body() dto: EditChannelDto) {
    return this.channelService.editChannel(dto);
  }
}
