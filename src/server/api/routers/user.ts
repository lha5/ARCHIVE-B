import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const userRouter = createTRPCRouter({
  createUser: protectedProcedure.input(z.object({ name: z.string() })).mutation(({ ctx, input }) => {
    return ctx.db.user.create({
      data: {
        name: input.name,
      },
    });
  }),
});
