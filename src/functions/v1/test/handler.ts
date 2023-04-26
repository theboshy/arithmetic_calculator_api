import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from '../../../common/v1/schemas/schema';
import { mysql } from 'src/common/database';

const test: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  let results = await mysql.query('SELECT * FROM test')
  await mysql.end()

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    //event,
    dbResult: results
  });
};

export const testHandler = middyfy(test);
