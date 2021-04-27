import { Global, Module } from '@nestjs/common';
import { WSChannelsGateway } from './wschannels.gateway';
import { WSService } from './wschannels.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [WSService, WSChannelsGateway],
  exports: [WSService],
})
export class WSChannelsModule {}
