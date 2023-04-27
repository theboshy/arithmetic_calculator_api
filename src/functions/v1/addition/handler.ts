import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { additionSchema } from '../../../common/v1/schemas/addition.schema';
import { Response } from 'src/common/v1/model/lambda.response';

const addition: ValidatedEventAPIGatewayProxyEvent<typeof additionSchema> = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let result :number = undefined;
  let response: Response;
  try {
    const {number_a, number_b} = event.body; 
    result = number_a + number_b;
    response.input = event.body;
    response.status = 200;
    response.response = `addition result: ${result}`;
  } catch (error) {
    //log errors 
    response.error = error.toString();
  }
  callback(null, apiGateWayResponse);
  return formatJSONResponse({
    message: `Operation completed successfully`,
    status: 200
  });
};

export const additionHandler = middyfy(addition);
