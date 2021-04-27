import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChannelsService } from 'src/channels/channels.service';
import { WSService } from './wschannels.service';

@WebSocketGateway(3333)
export class WSChannelsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() public server: Server;
  constructor(
    private readonly channelWSService: ChannelsService,
    private socketService: WSService,
  ) {}
  private logger: Logger = new Logger('ChannelGateway');

  @SubscribeMessage('@get_all_channels')
  async getAllChannels(client: Socket) {
    const channels = await this.channelWSService.getChannels();
    this.server.emit('channels', channels);
  }

  afterInit(server: Server) {
    this.logger.log('Websocket Init');
    this.socketService.socket = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
