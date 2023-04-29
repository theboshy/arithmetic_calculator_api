import { formatJSONResponse } from '@libs/api-gateway';
import { proxySchemaValidator } from '@libs/custom.midlewares/proxy.schema.validation';
import { middyfy } from '@libs/lambda';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { userRegisterSchema } from 'src/common/v1/schemas/user.schema';
import { userRegisterService } from 'src/common/v1/service/user.service';

const userRegister = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponse = new InternalResponse;
  try {
    const { username, password } = event.body;
    internalResponse = await userRegisterService(username, password);
    if (!internalResponse.error) {
      internalResponse.status = 201;
    }
    if (internalResponse.error && internalResponse.errorTrace.includes("already exists")) {
      internalResponse.status = 409
    }
  } catch (error) {
    internalResponse.status = 503;
    internalResponse.errorTrace = error;
  }
  return formatJSONResponse(internalResponse.status, { ...internalResponse });
};

export const userRegisterHandler = middyfy(userRegister).use(proxySchemaValidator(userRegisterSchema))
