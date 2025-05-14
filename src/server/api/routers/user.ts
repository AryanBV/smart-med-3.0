import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../../trpc';

export const userRouter = createTRPCRouter({
  getMe: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { profile: true },
    });
  }),
});
