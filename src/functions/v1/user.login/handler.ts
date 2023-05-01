import { formatJSONResponse } from '@libs/api-gateway';
import { proxySchemaValidator } from '@libs/custom.midlewares/proxy.schema.validation';
import { verifyUserLoginMiddleware } from '@libs/custom.midlewares/verify.user.middleware';
import { jwtSign } from '@libs/jwt/jwt.handler';
import { middyfy } from '@libs/lambda';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { userLoginSchema } from 'src/common/v1/schemas/user.schema';

const userLogin = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponse = new InternalResponse();
  try {
    const { username } = event.body;

    await jwtSign({ user: username })
      .then(token => {
        internalResponse.response = token;
        internalResponse.status = 200;
      })
      .catch(err => {
        internalResponse.status = 503;
        internalResponse.errorTrace = err;
      });

  } catch (error) {
    internalResponse.errorTrace = error;
  }
  return formatJSONResponse(internalResponse.status, { ...internalResponse });
};

export const userLoginHandler = middyfy(userLogin).use(proxySchemaValidator(userLoginSchema)).use(verifyUserLoginMiddleware())
