import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validate } from 'jsonschema';
import createError from 'http-errors';
import { validateTwoNumberOperation } from '@libs/validator/arithmetic.operator.validator';
import { requestValidationSchema } from 'src/common/v1/schemas/arithmetic.operation.schema';



export const queryParamMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<void> => {
    const { event } = request;
    if (!event.queryStringParameters) {
      throw new createError.BadRequest(JSON.stringify({error:"Request queryStringParameters validation failed is null"}));
    }
    const validationResult = validate(event.queryStringParameters, requestValidationSchema);
    if (validationResult.errors.length > 0) {
      throw new createError.BadRequest(JSON.stringify({error:"Request queryStringParameters validation failed: is not of a type(s) object"}));
    }
    const {numberA, numberB } = event.queryStringParameters;
    if (typeof numberA === 'string' && isNaN(parseInt(numberA))) {
      throw new createError.BadRequest(JSON.stringify({error: `${numberA} should be a number`}));
    } 
    if (typeof numberB === 'string' && isNaN(parseInt(numberB))) {
      throw new createError.BadRequest(JSON.stringify({error: `${numberB} should be a number`}));
    } 
    const validationArithmeticOperation = validateTwoNumberOperation(event.queryStringParameters);
    if (validationArithmeticOperation) {
      throw new createError.BadRequest(JSON.stringify({error:"Arithmetic Operation Error: the numbers must the numbers cannot be 0 or at least one of them must be greater than 0 "}));
    }
  }

  return {
    before
  }
}