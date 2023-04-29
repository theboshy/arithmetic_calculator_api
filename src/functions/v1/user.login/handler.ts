import { formatJSONResponse } from '@libs/api-gateway';
import { proxySchemaValidator } from '@libs/custom.midlewares/proxy.schema.validation';
import { middyfy } from '@libs/lambda';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { userLoginSchema } from 'src/common/v1/schemas/user.schema';
import { userLoginService } from 'src/common/v1/service/user.service';

const userLogin = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponse = new InternalResponse();
  try {
    const { username, password } = event.body;
    internalResponse = await userLoginService(username, password); //todo add http validations and status
  } catch (error) {
    internalResponse.errorTrace = error;
  }
  return formatJSONResponse(internalResponse.status, { ...internalResponse });
};

export const userLoginHandler = middyfy(userLogin).use(proxySchemaValidator(userLoginSchema))
