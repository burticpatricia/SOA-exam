import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EVENT_MICROSERVICE } from './constants';
import { EventModule } from './event.module';

const logger = new Logger(EVENT_MICROSERVICE);

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'redis',
        port: 6379,
      },
    },
  );
  logger.log(`Microservice ${EVENT_MICROSERVICE} is listening`);
  await app.listen();
}
bootstrap();
