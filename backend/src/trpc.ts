import { initTRPC } from '@trpc/server';
import superjson from "superjson";
import { ZodError } from 'zod';
import { type Context } from './context';


export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});



export const middleware = t.middleware;
export const router = t.router;

/**
 * Public procedures
 **/
export const publicProcedure = t.procedure;