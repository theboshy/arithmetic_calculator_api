import { formatJSONResponse } from '@libs/api-gateway';
import { proxySchemaValidator } from '@libs/custom.midlewares/proxy.schema.validator';
import { verifyUserRegisterMiddleware } from '@libs/custom.midlewares/proxy.user.validator';
import { middyfy } from '@libs/lambda';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { userRegisterSchema } from 'src/common/v1/schemas/user.schema';
import { userRegisterService } from 'src/common/v1/service/user.service';

const userRegister = async (event: any, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponse = new InternalResponse;
  try {
    if (process.env.IS_OFFLINE) {
      const { username, password } = event.body;
      internalResponse = await userRegisterService(username, password);
      if (!internalResponse.error) {
        internalResponse.status = 201;
      }
    }
  } catch (error) {
    internalResponse.status = 503;
    internalResponse.errorTrace = "An internal error occurred";
  }
  return formatJSONResponse(internalResponse.status, { ...internalResponse });
};

export const userRegisterHandler = middyfy(userRegister).use(proxySchemaValidator(userRegisterSchema)).use(verifyUserRegisterMiddleware())
