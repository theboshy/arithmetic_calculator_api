import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validate } from 'jsonschema';
import createError from 'http-errors';
import { validateTwoNumberOperation } from '@libs/validator/arithmetic.operator.validator';


export const queryParamMiddleware = (schema: any): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<void> => {
    const { event } = request;
    if (!event.queryStringParameters) {
      throw new createError.BadRequest(JSON.stringify({error:"Request queryStringParameters validation failed is null"}));
    }
    const validationResult = validate(event.queryStringParameters, schema);
    if (validationResult.errors.length > 0) {
      throw new createError.BadRequest(JSON.stringify({error:"Request queryStringParameters validation failed: is not of a type(s) object"}));
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