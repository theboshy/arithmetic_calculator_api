import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { proxyJWTAuthenticator } from '@libs/custom.midlewares/proxy.jwt.authenticator';
import { operationGetAllService } from 'src/common/v1/service/operation.service';
import { proxySchemaQueryValidator } from '@libs/custom.midlewares/proxy.schema.query.validator';
import { operationRequestSchema } from 'src/common/v1/schemas/operation.schema';

const operationGetAll = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponse = new InternalResponse;
  let status = 503;
  try {
    const {limit, lastEvaluatedKey} = event.queryStringParameters;
    internalResponse = await operationGetAllService(limit, lastEvaluatedKey)
    if (!internalResponse.error) {
      status = 200;
    }
  } catch (error) {
    internalResponse.errorTrace = error;
  }
  return formatJSONResponse(status, {...internalResponse});
};

export const operationGetAllHandler = middyfy(operationGetAll).use(proxyJWTAuthenticator()).use(proxySchemaQueryValidator(operationRequestSchema));
