import { initTRPC } from '@trpc/server';
import { type Context } from './context';



const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const router = t.router;

/**
 * Public procedures
 **/
export const publicProcedure = t.procedure;