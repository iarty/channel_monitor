import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Provider } from '../../db/models/provider.model';

@Module({
  imports: [SequelizeModule.forFeature([Provider])],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
