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
  let status = 503;
  try {
    const {username, password} = event.body;
    internalResponse = await userRegisterService(username, password);
    if (!internalResponse.error) {
      status = 200;
    }
  } catch (error) {
    internalResponse.errorTrace = error;
  }
  return formatJSONResponse(status, {...internalResponse});
};

export const userRegisterHandler = middyfy(userRegister).use(proxySchemaValidator(userRegisterSchema))
