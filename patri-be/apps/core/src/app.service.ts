import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BLOG_MICROSERVICE } from 'apps/blog/src/constants';
import { EVENT_MICROSERVICE } from 'apps/event/src/constants';
import { IdObject } from 'apps/event/src/event.controller';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject(BLOG_MICROSERVICE) private blogClient: ClientProxy,
    @Inject(EVENT_MICROSERVICE) private eventClient: ClientProxy,
  ) {}

  public getBlogHealthcheck(): Promise<boolean> {
    return firstValueFrom(this.blogClient.send<boolean>('healthcheck', ''));
  }

  public getEventHealthcheck(): Promise<boolean> {
    return firstValueFrom(this.eventClient.send<boolean>('healthcheck', ''));
  }

  public sendEvent(eventId: string): Promise<IdObject> {
    return firstValueFrom(
      this.eventClient.send<IdObject>('sendEvent', eventId),
    );
  }
}
