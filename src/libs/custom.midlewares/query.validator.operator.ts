import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validate } from 'jsonschema';
import createError from 'http-errors';
import { validateTwoNumberOperation } from '@libs/validator/arithmetic.operator.validator';
import { requestValidationSchema, requestValidationSchemaSquareRoot } from 'src/common/v1/schemas/arithmetic.operation.schema';
import { MATCH_POSITIVE_NUMBERS, regexMatcher } from '@libs/regex.validator/regex.validator';



export const queryParamMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<void> => {
    const { event } = request;

    //square root validation (prevents negative numbers to not handle any cost)
    if (event.path.includes("squareRoot")) {
      const requestValidation = validate(event.queryStringParameters, requestValidationSchemaSquareRoot);
      if (requestValidation.errors.length > 0) {
        throw new createError.BadRequest(JSON.stringify({ error: "request error number required" }));
      }
      const { numberA } = event.queryStringParameters
      if (!regexMatcher(numberA, MATCH_POSITIVE_NUMBERS)) {
        throw new createError.BadRequest(JSON.stringify({ error: `'${numberA}' should be a positive number` }));
      }
      return;
    }
    //-- validation and verifications before executin a transaction cost
    if (!event.queryStringParameters) {
      throw new createError.BadRequest(JSON.stringify({ error: "Request queryStringParameters validation failed is null" }));
    }
    const validationResult = validate(event.queryStringParameters, requestValidationSchema);
    if (validationResult.errors.length > 0) {
      throw new createError.BadRequest(JSON.stringify({ error: "Request queryStringParameters validation failed: is not of a type(s) object" }));
    }
    const { numberA, numberB } = event.queryStringParameters;
    if (!regexMatcher(numberA)) {
      throw new createError.BadRequest(JSON.stringify({ error: `'${numberA}' should be a number` }));
    }
    if (!regexMatcher(numberB)) {
      throw new createError.BadRequest(JSON.stringify({ error: `'${numberB}' should be a number` }));
    }

    //divison validation to prevent infinite divison and request cost
    if (event.path.includes("division")) {
      if (parseFloat(numberB) === 0) { //parseInt(numberB)
        throw new createError.BadRequest(JSON.stringify({ error: `'${numberB}' Cannot divide by zero` }));
      }
    }
    
    const validationArithmeticOperation = validateTwoNumberOperation(event.queryStringParameters);
    if (validationArithmeticOperation) {
      throw new createError.BadRequest(JSON.stringify({ error: "Arithmetic Operation Error: the numbers must the numbers cannot be 0 or at least one of them must be greater than 0 " }));
    }
  }

  return {
    before
  }
}