import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from '../../../common/v1/schemas/schema';
import { MysqlInstance } from 'src/common/database/mysql.db';

const test: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  let results = {}
  let errorHandler = {};
  //console.log(process.env.IS_OFFLINE)
  try {
    results = await MysqlInstance.getInstance().query('SELECT * FROM test1')
    await MysqlInstance.getInstance().end() 
  } catch (error) {
    errorHandler = error
  }

  return formatJSONResponse(200, {
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    //event,
    error: errorHandler ? errorHandler : null,
    dbResult: results ? results : null
  });
};

export const testHandler = middyfy(test);
