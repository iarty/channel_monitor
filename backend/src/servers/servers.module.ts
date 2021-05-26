import { Module } from '@nestjs/common';
import { ProvidersController } from './servers.controller';
import { ServersService } from './servers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Server } from 'db/models/servers.model';

@Module({
  imports: [SequelizeModule.forFeature([Server])],
  controllers: [ProvidersController],
  providers: [ServersService],
})
export class ServersModule {}
