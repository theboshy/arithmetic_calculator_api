import { ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { queryParamMiddleware } from '@libs/custom.midlewares/query.validator.operator';
import { requestValidationSchema } from 'src/common/v1/schemas/arithmetic.operation.schema';
import { subtractionService } from 'src/common/v1/service/subtraction.service';

const subtraction: ValidatedEventAPIGatewayProxyEvent<typeof requestValidationSchema> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponse = new InternalResponse;
  let status = 503;
  try {
    const {numberA, numberB} = event.queryStringParameters;
    internalResponse = subtractionService(parseInt(numberA), parseInt(numberB));
    if (!internalResponse.error) {
      status = 200;
    }
  } catch (error) {
    internalResponse.errorTrace = error;
  }
  return formatJSONResponse(status, {...internalResponse});
};

export const subtractionHandler = middyfy(subtraction).use(queryParamMiddleware(requestValidationSchema))
