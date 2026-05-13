import crypto from "node:crypto";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../../../config/env";
import type { SafeUser } from "../../users/services/user.service";

export type AccessTokenPayload = JwtPayload & {
  sub: string;
  email: string;
  role: SafeUser["role"];
  permissions: unknown;
};

export function signAccessToken(user: SafeUser) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    },
    env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: env.JWT_EXPIRES_IN_SECONDS,
    },
  );
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const payload = jwt.verify(token, env.JWT_SECRET, {
    algorithms: ["HS256"],
  });

  if (typeof payload === "string" || !payload.sub || !payload.email) {
    throw new Error("Token payload is invalid.");
  }

  return payload as AccessTokenPayload;
}

export function generateRefreshToken() {
  return crypto.randomBytes(48).toString("base64url");
}

export function hashRefreshToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
