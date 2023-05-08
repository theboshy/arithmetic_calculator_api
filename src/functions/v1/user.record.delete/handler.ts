import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { InternalResponsePaginated } from 'src/common/v1/model/internal.response';
import { proxyJWTAuthenticator } from '@libs/custom.midlewares/proxy.jwt.authenticator';
import { updatetRecord, userGetRecord } from 'src/common/v1/service/user.record.service';
import { InternalResponsePaginatedInterface } from 'src/common/v1/interface/internal.response';
import { proxySchemaValidator } from '@libs/custom.midlewares/proxy.schema.validator';
import { userRecordDeleteRequestSchema } from 'src/common/v1/schemas/user.record.schema';

/**
 * 
 * @param event 
 * @param context 
 * @returns 
 * @note internal error are handdled locaclly not exposed to user
 */
const userRecordDelete = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponsePaginatedInterface = new InternalResponsePaginated;
  let deletedIds = [];
  try {
    const { userRecordId } = event.body; //arrays of ids
    for (const recordIdToDelete of userRecordId) {
      internalResponse = await userGetRecord(recordIdToDelete);
      if (internalResponse.error) {
        switch (internalResponse.errorTrace) {
          default: {
            internalResponse.status = 404
            internalResponse.errorTrace = "Can't find user record"
            break;
          }
        }
        break;
      } else {
        const record = { ...internalResponse.response } as any;
        record.deleted = true;
        internalResponse = await updatetRecord(recordIdToDelete, record)
        internalResponse.status = 500;
        if (!internalResponse.error) {
          internalResponse.status = 200;
          deletedIds.push(recordIdToDelete)
        }
      }
    }
    internalResponse.response.items = deletedIds;
  } catch (error) {
    internalResponse.errorTrace = "An internal error occurred";
  }
  return formatJSONResponse(internalResponse.status, { ...internalResponse });
};

export const userRecordDeleteHandler = middyfy(userRecordDelete).use(proxySchemaValidator(userRecordDeleteRequestSchema)).use(proxyJWTAuthenticator());
