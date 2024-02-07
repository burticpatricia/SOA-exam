declare namespace Express {
  import { AuthType } from '@@/apps/core/src/guards/auth.guard';

  export interface Request {
    user?: {
      id: string;
      authType: AuthType;
    };
  }
}
