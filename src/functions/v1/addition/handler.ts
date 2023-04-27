import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { additionSchema } from '../../../common/v1/schemas/addition.schema';
import { LambdaResponse } from 'src/common/v1/interface/lambda.response';
import { addition_service } from 'src/common/v1/service/addition.service';

const addition: ValidatedEventAPIGatewayProxyEvent<typeof additionSchema> = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let lambdaResponse: LambdaResponse = {
    statusCode: 503,
    body: {}
  };
  try {
    const {number_a, number_b} = event.body; 
    const internalResponse = addition_service(number_a, number_b);
    if (!internalResponse.error) {
      lambdaResponse.statusCode = 200;
    }
    lambdaResponse.body.input = event.body;
    lambdaResponse.body.response = internalResponse.response;
  } catch (error) {
    //log errors 
    lambdaResponse.body.error = error.toString();
  }
  callback(null, lambdaResponse);
  return formatJSONResponse({
    lambdaResponse,
    event
  });
};

export const additionHandler = middyfy(addition);
