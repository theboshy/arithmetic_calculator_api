import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from '../../../common/v1/schemas/schema';
import { mysql } from 'src/common/database/database';

const test: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  let results = {}
  let errorHandler = {};
  //console.log(process.env.IS_OFFLINE)
  try {
    results = await mysql.query('SELECT * FROM test1')
    await mysql.end() 
  } catch (error) {
    errorHandler = error
  }

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    //event,
    error: errorHandler ? errorHandler : null,
    dbResult: results ? results : null
  });
};

export const testHandler = middyfy(test);
