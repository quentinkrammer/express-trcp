import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { describe, expect, test } from 'vitest';
import { AppRouter } from './router';



export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});

describe('trpc integration tests', () =>{

    test('query', async () =>{
        const user = await trpc.user.getUserById.query('0')
        expect(user?.name).toEqual('Robin Wieruch')
    })

    test('mutate', async () =>{
        const user = await trpc.user.createUser.mutate({name: 'Jim'})
        expect(user.name).toEqual('Jim')
    })
})