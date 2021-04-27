import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class WSService {
  public socket: Server = null;
}
