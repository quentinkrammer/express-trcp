import { z } from 'zod';
import { User, users } from './mockDb';
import { publicProcedure, router } from './trpc';

export const userRouter = router({
  getUsers: publicProcedure.query(() => {
    return users;
  }),
  getUserById: publicProcedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;

      const user = users.find((user) => user.id === input);

      return user;
    }),
  createUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation((req) => {
      const { input } = req;

      const user: User = {
        id: `${Math.random()}`,
        name: input.name,
      };

      users.push(user);
      console.log('in router', JSON.stringify(user))
      return user;
    }),
});

export const appRouter = router({
    user: userRouter,
  });
  
export type AppRouter = typeof appRouter;