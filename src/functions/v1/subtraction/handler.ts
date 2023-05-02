import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { queryParamMiddleware } from '@libs/custom.midlewares/arithmetic.query.numbers.validator.operator';
import { subtractionService } from 'src/common/v1/service/subtraction.service';
import { proxyJWTAuthenticator } from '@libs/custom.midlewares/proxy.jwt.authenticator';
import { costPerRequestMiddleware } from '@libs/custom.midlewares/cost.per.request.middleware';

const subtraction = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponse = new InternalResponse;
  let status = 503;
  try {
    const {numberA, numberB} = event.queryStringParameters;
    internalResponse = subtractionService(parseFloat(numberA), parseFloat(numberB));
    if (!internalResponse.error) {
      status = 200;
      event.operationResponse = internalResponse.response
    }
  } catch (error) {
    internalResponse.errorTrace = error;
  }
  return formatJSONResponse(status, {...internalResponse});
};

export const subtractionHandler = middyfy(subtraction)
.use(proxyJWTAuthenticator())
.use(queryParamMiddleware())
.use(costPerRequestMiddleware())

