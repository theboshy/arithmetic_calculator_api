import { handlerPath } from '@libs/handler-resolver';
import { additionSchema } from 'src/common/v1/schemas/addition.schema';

export const addition = {
  handler: `${handlerPath(__dirname)}/handler.additionHandler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'v1/addition',
        request: {
          schemas: {
            'application/json': additionSchema,
          },
        },
      },
    },
  ],
};
