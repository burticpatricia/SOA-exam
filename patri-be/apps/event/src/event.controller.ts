import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SqsService } from '@ssut/nestjs-sqs';
import { EVENT_SQS_NAME } from './constants';

export interface IdObject {
  id: string;
}

@Controller()
export class EventController {
  constructor(private readonly sqsService: SqsService) {}

  @MessagePattern('healthcheck')
  healthcheck(): boolean {
    return true;
  }

  @MessagePattern('sendEvent')
  async sendEvent(@Payload() id: string): Promise<IdObject> {
    await this.sqsService.send(EVENT_SQS_NAME, {
      id,
      body: { eventId: id },
    });

    return { id };
  }
}
