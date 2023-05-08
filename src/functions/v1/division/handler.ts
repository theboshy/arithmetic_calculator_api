import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { queryParamMiddleware } from '@libs/custom.midlewares/arithmetic.query.numbers.validator.operator';
import { divisionService } from 'src/common/v1/service/division.service';
import { proxyJWTAuthenticator } from '@libs/custom.midlewares/proxy.jwt.authenticator';
import { costPerRequestMiddleware } from '@libs/custom.midlewares/cost.per.request.middleware';

const division = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponse = new InternalResponse;
  let status = 503;
  try {
    const {numberA, numberB} = event.queryStringParameters;
    internalResponse = divisionService(parseFloat(numberA), parseFloat(numberB));
    if (!internalResponse.error) {
      status = 200;
      event.operationResponse = internalResponse.response
    }
  } catch (error) {
    internalResponse.errorTrace = "An internal error occurred";
  }
  return formatJSONResponse(status, {...internalResponse});
};

export const divisionHandler = middyfy(division)
.use(proxyJWTAuthenticator())
.use(queryParamMiddleware())
.use(costPerRequestMiddleware())
