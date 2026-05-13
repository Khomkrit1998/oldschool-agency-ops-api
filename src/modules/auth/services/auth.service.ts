import bcrypt from "bcryptjs";
import { env } from "../../../config/env";
import { AppError } from "../../../shared/errors/app-error";
import { userRepository } from "../../users/repositories/user.repository";
import { toSafeUser } from "../../users/services/user.service";
import { refreshTokenRepository } from "../repositories/refresh-token.repository";
import type { LoginInput, RegisterInput, UpdateProfileInput } from "../validations/auth.validation";
import { generateRefreshToken, hashRefreshToken, signAccessToken } from "../utils/token.util";

function getRefreshTokenExpiryDate() {
  const expiresAt = new Date();

  if (env.REFRESH_TOKEN_EXPIRES_IN_SECONDS) {
    expiresAt.setSeconds(expiresAt.getSeconds() + env.REFRESH_TOKEN_EXPIRES_IN_SECONDS);
    return expiresAt;
  }

  expiresAt.setDate(expiresAt.getDate() + env.REFRESH_TOKEN_EXPIRES_IN_DAYS);
  return expiresAt;
}

async function issueTokenPair(user: ReturnType<typeof toSafeUser>) {
  const refreshToken = generateRefreshToken();
  const refreshTokenExpiresAt = getRefreshTokenExpiryDate();

  await refreshTokenRepository.create({
    tokenHash: hashRefreshToken(refreshToken),
    userId: user.id,
    expiresAt: refreshTokenExpiresAt,
  });

  return {
    accessToken: signAccessToken(user),
    refreshToken,
    refreshTokenExpiresAt: refreshTokenExpiresAt.toISOString(),
  };
}

export const authService = {
  async register(input: RegisterInput) {
    const existingUser = await userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new AppError(409, "Email is already registered.");
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });
    const safeUser = toSafeUser(user);
    const tokens = await issueTokenPair(safeUser);

    return {
      user: safeUser,
      ...tokens,
    };
  },

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);
    const passwordMatches = user ? await bcrypt.compare(input.password, user.passwordHash) : false;

    if (!user || !passwordMatches) {
      throw new AppError(401, "Email or password is incorrect.");
    }

    const safeUser = toSafeUser(user);
    const tokens = await issueTokenPair(safeUser);

    return {
      user: safeUser,
      ...tokens,
    };
  },

  async refresh(refreshToken: string) {
    const activeToken = await refreshTokenRepository.findActiveByHash(hashRefreshToken(refreshToken));

    if (!activeToken || activeToken.user.deletedAt) {
      throw new AppError(401, "Refresh token is invalid or expired.");
    }

    await refreshTokenRepository.revoke(activeToken.id);

    const safeUser = toSafeUser(activeToken.user);
    const tokens = await issueTokenPair(safeUser);

    return {
      user: safeUser,
      ...tokens,
    };
  },

  async logout(refreshToken?: string) {
    if (!refreshToken) {
      return;
    }

    const activeToken = await refreshTokenRepository.findActiveByHash(hashRefreshToken(refreshToken));

    if (activeToken) {
      await refreshTokenRepository.revoke(activeToken.id);
    }
  },

  async updateProfile(userId: string, input: UpdateProfileInput) {
    if (input.email) {
      const existingUser = await userRepository.findByEmail(input.email);

      if (existingUser && existingUser.id !== userId) {
        throw new AppError(409, "Email is already registered.");
      }
    }

    const user = await userRepository.update(userId, {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.email !== undefined ? { email: input.email } : {}),
    });

    return {
      user: toSafeUser(user),
    };
  },
};
