import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(z.object({ name: z.string(), type: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          type: input.type,
          content: input.content,
          author: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAllPosts: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }),

  getAllPostsByUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: 'desc' },
      where: { author: { id: ctx.session.user.id } },
    });
  }),
});
