import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateServerDto, EditServerDto } from 'db/models/servers.dto';
import { ServersService } from './servers.service';

@Controller('/servers')
export class ProvidersController {
  constructor(private serversService: ServersService) {}

  @Get('/all')
  getServers() {
    return this.serversService.getServers();
  }

  @Get('/:id')
  getServerById(@Param('id') id: string) {
    return this.serversService.getServerById(id);
  }

  @Post()
  addServer(@Body() dto: CreateServerDto) {
    return this.serversService.addServer(dto);
  }

  @Delete('/:id')
  deleteServer(@Param('id') id: string) {
    return this.serversService.deleteServer(id);
  }

  @Put()
  editServer(@Body() dto: EditServerDto) {
    return this.serversService.editServer(dto);
  }
}
