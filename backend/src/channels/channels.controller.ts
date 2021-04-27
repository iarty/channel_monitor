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

  @Delete('/:id')
  deleteChannel(@Param('id') id: string) {
    return this.channelService.deleteChannel(id);
  }

  @Put()
  editChannel(@Body() dto: EditChannelDto) {
    console.log(dto);
    return this.channelService.editChannel(dto);
  }
}
