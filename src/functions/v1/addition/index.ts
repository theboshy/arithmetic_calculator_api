import { handlerPath } from '@libs/handler-resolver';
import schema from '../../../common/v1/schemas/schema';

export const test = {
  handler: `${handlerPath(__dirname)}/handler.testHandler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'v1/test',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
