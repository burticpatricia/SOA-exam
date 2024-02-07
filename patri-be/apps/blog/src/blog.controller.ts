import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BlogController {
  constructor() {}

  @MessagePattern('healthcheck')
  healthcheck(): boolean {
    return true;
  }
}
