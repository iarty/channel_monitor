import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProviderDto, EditProviderDto } from 'db/models/providers.dto';
import { ProvidersService } from './providers.service';

@Controller('/providers')
export class ProvidersController {
  constructor(private providerService: ProvidersService) {}

  @Get('/all')
  getProviders() {
    return this.providerService.getProviders();
  }

  @Get('/:id')
  getProviderById(@Param('id') id: string) {
    return this.providerService.getProviderById(id);
  }

  @Post()
  addProvider(@Body() dto: CreateProviderDto) {
    return this.providerService.addProvider(dto);
  }

  @Delete('/:id')
  deleteProvider(@Param('id') id: string) {
    return this.providerService.deleteProvider(id);
  }

  @Put()
  editProvider(@Body() dto: EditProviderDto) {
    return this.providerService.editProvider(dto);
  }
}
