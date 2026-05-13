import type { AccessTokenPayload } from "../modules/auth/utils/token.util";
import type { SafeUser } from "../modules/users/services/user.service";

declare global {
  namespace Express {
    interface Request {
      auth?: AccessTokenPayload;
      user?: SafeUser;
    }
  }
}

export {};
