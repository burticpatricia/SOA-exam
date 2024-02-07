import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

export const NEW_EVENT_CONSUMED = 'NEW_EVENT_CONSUMED';
export const ON_EVENT_CONSUMED = 'ON_EVENT_CONSUMED';

export interface NewEventArgs {
  eventId: string;
}

@WebSocketGateway(3001)
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;

  handleConnection() {}

  handleDisconnect() {}

  @SubscribeMessage(NEW_EVENT_CONSUMED)
  onNewEventConsumed(@MessageBody() args: string): void {
    this.server.emit(ON_EVENT_CONSUMED, args);
  }
}
