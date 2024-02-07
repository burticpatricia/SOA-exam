import { Logger, Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { SqsModule } from '@ssut/nestjs-sqs';
import { EVENT_SQS_NAME } from './constants';
import { SQSClient } from '@aws-sdk/client-sqs';
import { EventService } from './event.service';
import { EventGateway } from './event.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SqsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          producers: [
            {
              name: EVENT_SQS_NAME,
              queueUrl: configService.get('APP_EVENT_SQS_QUEUE'),
              sqs: new SQSClient({
                region: configService.get('APP_AWS_REGION'),
                credentials: {
                  accessKeyId: configService.get('APP_AWS_KEY'),
                  secretAccessKey: configService.get('APP_AWS_SECRET'),
                },
              }),
            },
          ],
        };
      },
    }),
  ],
  controllers: [EventController],
  providers: [EventService, EventGateway, Logger],
})
export class EventModule {}
