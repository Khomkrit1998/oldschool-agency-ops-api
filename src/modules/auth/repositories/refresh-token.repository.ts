import { prisma } from "../../../database/prisma";

export type CreateRefreshTokenData = {
  tokenHash: string;
  userId: string;
  expiresAt: Date;
};

export const refreshTokenRepository = {
  create(data: CreateRefreshTokenData) {
    return prisma.refreshToken.create({ data });
  },

  findActiveByHash(tokenHash: string) {
    return prisma.refreshToken.findFirst({
      where: {
        tokenHash,
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });
  },

  revoke(id: string) {
    return prisma.refreshToken.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  },

  revokeAllForUser(userId: string) {
    return prisma.refreshToken.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  },
};
