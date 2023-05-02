import { formatJSONResponse } from '@libs/api-gateway';
import { proxyJWTAuthenticator } from '@libs/custom.midlewares/proxy.jwt.authenticator';
import { middyfy } from '@libs/lambda';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { stringGeneratorService } from 'src/common/v1/service/string.generator.service';

const stringGenerator = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponse = new InternalResponse;
  let status = 503;
  try {
    internalResponse = await stringGeneratorService()
    status = 200
    event.operationResponse = internalResponse.response
  } catch (error) {
    internalResponse.errorTrace = error;
  }
  return formatJSONResponse(status, {...internalResponse});
};

export const stringGeneratorHandler = middyfy(stringGenerator).use(proxyJWTAuthenticator())
