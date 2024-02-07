import {
  Body,
  ConflictException,
  Controller,
  Get,
  MessageEvent,
  Post,
  Sse,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { IdObject } from 'apps/event/src/event.controller';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Observable, interval, map } from 'rxjs';
import { AppService } from './app.service';
import { AuthGuard, AuthType } from './guards/auth.guard';
import { users } from './users';

class StatusResponse {
  @ApiProperty({ type: Boolean })
  status: boolean;
}

class IdResponse implements IdObject {
  @ApiProperty({ type: String })
  id: string;
}

class SendEventArgs {
  @ApiProperty({ minLength: 0, maxLength: 255 })
  public eventId!: string;
}

class LoginBody {
  @ApiProperty()
  public email!: string;

  @ApiProperty()
  public password!: string;
}

@Controller()
export class AppController {
  private events: string[] = [];

  constructor(private readonly appService: AppService) {}

  @Get('blog/healthcheck')
  @ApiResponse({ type: StatusResponse })
  async getBlogHealthcheck(): Promise<StatusResponse> {
    const status = await this.appService.getBlogHealthcheck();

    return { status };
  }

  @Get('event/healthcheck')
  @ApiResponse({ type: StatusResponse })
  async getEventHealthcheck(): Promise<StatusResponse> {
    const status = await this.appService.getEventHealthcheck();

    return { status };
  }

  @Post('event/send-event')
  @ApiResponse({ type: IdResponse })
  @ApiBearerAuth()
  @UseGuards(AuthGuard([AuthType.JWT]))
  async sendEvent(@Body() { eventId }: SendEventArgs): Promise<IdResponse> {
    this.events.push(eventId);
    return await this.appService.sendEvent(eventId);
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(() => {
        if (this.events.length === 0) {
          return;
        }
        const eventId = this.events.shift();
        return { data: eventId };
      }),
    );
  }

  @Post('auth/login')
  @ApiCreatedResponse({ type: String })
  async login(@Body() { email, password }: LoginBody): Promise<string> {
    const user = users.find((user) => user.email === email);

    if (user === undefined) {
      throw new ConflictException('User not found');
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new ConflictException('Wrong password');
    }

    const jwtToken = sign({ id: user.id }, 'secret');

    return jwtToken;
  }
}
