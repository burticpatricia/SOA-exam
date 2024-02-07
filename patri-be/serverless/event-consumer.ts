import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { EventModule } from 'apps/event/src/event.module';
import { EventService } from 'apps/event/src/event.service';
import { SQSHandler } from 'aws-lambda';
import { Logger } from '@nestjs/common';

export const eventsHandler: SQSHandler = async (ctx) => {
  const app = await NestFactory.createApplicationContext(EventModule);
  const logger = new Logger('Event consumer');

  const eventGateway = app.get(EventService);

  const failedIds: string[] = [];

  for (const record of ctx.Records) {
    try {
      eventGateway.triggerEvent({ eventId: record.messageId });
      logger.log('event consumed', record.messageId, record.body);
    } catch (error) {
      failedIds.push(record.messageId);
      logger.log('event failed to consume', record.messageId, record.body);
    }
  }

  return { batchItemFailures: failedIds.map((id) => ({ itemIdentifier: id })) };
};
