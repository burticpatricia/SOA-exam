import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BlogModule } from './blog.module';
import { BLOG_MICROSERVICE } from './constants';

const logger = new Logger(BLOG_MICROSERVICE);

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BlogModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'redis',
        port: 6379,
      },
    },
  );
  logger.log(`Microservice ${BLOG_MICROSERVICE} is listening`);
  await app.listen();
}
bootstrap();
