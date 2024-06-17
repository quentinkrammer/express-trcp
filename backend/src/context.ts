import * as trpcExpress from '@trpc/server/adapters/express';




// export const trpc = initTRPC.context<Context>().create({
//   transformer: superjson,
//   errorFormatter({ shape, error }) {
//     return {
//       ...shape,
//       data: {
//         ...shape.data,
//         zodError:
//           error.cause instanceof ZodError ? error.cause.flatten() : null,
//       },
//     };
//   },
// });


export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const user = { name : 'CtxUser'} as const
  return { user };
};
export type Context = Awaited<ReturnType<typeof createContext>>;