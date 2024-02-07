import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { NEW_EVENT_CONSUMED, NewEventArgs } from './event.gateway';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class EventService implements OnModuleInit {
  private socketClient: Socket;

  onModuleInit() {
    this.socketClient.on('connect', () => {
      this.logger.log('Event service connected to EventGateway');
    });
  }

  constructor(private logger: Logger) {
    this.socketClient = io('http://localhost:3001');
  }

  public triggerEvent(event: NewEventArgs): void {
    this.socketClient.emit(NEW_EVENT_CONSUMED, event);
  }
}
