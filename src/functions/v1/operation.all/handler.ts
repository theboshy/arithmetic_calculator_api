import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { proxyJWTAuthenticator } from '@libs/custom.midlewares/proxy.jwt.authenticator';
import { operationGetAllService } from 'src/common/v1/service/operation.service';

const operationGetAll = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponse = new InternalResponse;
  try {
    const { limit, lastEvaluatedKey } = event.queryStringParameters || {};
    internalResponse = await operationGetAllService(limit, lastEvaluatedKey)
    if (internalResponse.error) {
      switch (internalResponse.errorTrace) {
        case "operations is void": {
          internalResponse.status = 404
          break;
        }
        default: {
          internalResponse.status = 503
          break;
        }
      }
    } else {
      internalResponse.status = 200;
    }
  } catch (error) {
    internalResponse.errorTrace = "An internal error occurred";
  }
  return formatJSONResponse(internalResponse.status, { ...internalResponse });
};

export const operationGetAllHandler = middyfy(operationGetAll).use(proxyJWTAuthenticator());
