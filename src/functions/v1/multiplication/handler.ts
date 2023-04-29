import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { queryParamMiddleware } from '@libs/custom.midlewares/arithmetic.query.numbers.validator.operator';
import { multiplicationService } from 'src/common/v1/service/multiplication.service';
import { proxyJWTAuthenticator } from '@libs/custom.midlewares/proxy.jwt.authenticator';


const multiplication = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponse = new InternalResponse;
  let status = 503;
  try {
    const {numberA, numberB} = event.queryStringParameters;
    internalResponse = multiplicationService(parseFloat(numberA), parseFloat(numberB));
    if (!internalResponse.error) {
      status = 200;
    }
  } catch (error) {
    internalResponse.errorTrace = error;
  }
  return formatJSONResponse(status, {...internalResponse});
};

export const multiplicationHandler = middyfy(multiplication).use(proxyJWTAuthenticator()).use(queryParamMiddleware())
