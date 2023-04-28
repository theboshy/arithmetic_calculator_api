import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { additionService } from 'src/common/v1/service/addition.service';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { queryParamMiddleware } from '@libs/custom.midlewares/query.validator.operator';


const addition = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  //--
  let internalResponse: InternalResponse = new InternalResponse;
  let status = 503;
  try {
    const {numberA, numberB} = event.queryStringParameters;
    internalResponse = additionService(parseFloat(numberA), parseFloat(numberB));
    if (!internalResponse.error) {
      status = 200;
    }
  } catch (error) {
    internalResponse.errorTrace = error;
  }
  return formatJSONResponse(status, {...internalResponse});
};

export const additionHandler = middyfy(addition).use(queryParamMiddleware())
