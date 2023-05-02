import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { InternalResponse, InternalResponsePaginated } from 'src/common/v1/model/internal.response';
import { proxyJWTAuthenticator } from '@libs/custom.midlewares/proxy.jwt.authenticator';
import { userRecordGetAllByUserService } from 'src/common/v1/service/user.record.service';
import { userRecordRequestSchema } from 'src/common/v1/schemas/user.record.schema';
import { proxySchemaQueryValidator } from '@libs/custom.midlewares/proxy.schema.query.validator';
import { InternalResponseInterface, InternalResponsePaginatedInterface } from 'src/common/v1/interface/internal.response';

/**
 * 
 * @param event 
 * @param context 
 * @returns 
 * @note internal error are handdled locaclly not exposed to user
 */
const userRecordGetAll = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponsePaginatedInterface = new InternalResponsePaginated;
  try {
    const { limit, lastEvaluatedKey } = event.queryStringParameters || {};
    const { user } = event.decoded;
    internalResponse = await userRecordGetAllByUserService(user, limit, lastEvaluatedKey)
    if (internalResponse.error) {
      switch (internalResponse.errorTrace) {
        case "user records is void": {
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

export const userRecordGetAllHandler = middyfy(userRecordGetAll).use(proxyJWTAuthenticator());
