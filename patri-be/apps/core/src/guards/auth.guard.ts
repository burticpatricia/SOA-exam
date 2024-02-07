import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  mixin,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

export enum AuthType {
  JWT = 'JWT',
}

interface PolicyResponse {
  id: string;
  authType: AuthType;
}

export interface JWT {
  id: string;
}

export const JWT_TOKEN_NAME = 'Bearer';

export const AuthGuard = (policies: AuthType | AuthType[] = []) => {
  class AuthGuardMixin implements CanActivate {
    public policies: AuthType[] = [];

    constructor() {
      Array.isArray(policies)
        ? (this.policies = policies)
        : (this.policies = [policies]);
    }

    public async canActivate(ctx: ExecutionContext): Promise<boolean> {
      if (this.policies.length === 0) {
        throw new HttpException(
          `Auth guard has no auth policy specified`,
          HttpStatus.CONFLICT,
        );
      }
      const req = ctx.switchToHttp().getRequest<Request>();

      const fullfilledPolicies = await Promise.all(
        this.policies.map((policy) => this[policy](req)),
      );

      for (const policy of fullfilledPolicies) {
        if (policy === undefined) {
          continue;
        }

        req.user = {
          id: policy.id,
          authType: policy.authType,
        };

        return true;
      }

      throw new HttpException(
        `Invalid token for auth policies: ${this.policies.join(', ')}`,
        HttpStatus.FORBIDDEN,
      );
    }

    public async [AuthType.JWT]({
      headers,
    }: Request): Promise<PolicyResponse | undefined> {
      const { authorization } = headers;

      if (typeof authorization !== 'string') {
        return undefined;
      }

      const bearerToken =
        authorization?.split(JWT_TOKEN_NAME)[1]?.trim() ??
        authorization?.split(JWT_TOKEN_NAME.toLowerCase())[1]?.trim();

      if (bearerToken === undefined) {
        return undefined;
      }

      const jwt = verify(bearerToken, 'secret') as JWT;

      if (jwt.id === undefined) {
        return undefined;
      }

      return {
        id: jwt.id,
        authType: AuthType.JWT,
      };
    }
  }

  return mixin(AuthGuardMixin);
};
