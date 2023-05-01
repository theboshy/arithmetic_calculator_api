import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validate } from 'jsonschema';
import createError from 'http-errors';


export const proxySchemaQueryValidator = (schema: any): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
    const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ): Promise<void> => {
        const { event } = request;
        const validationResult = validate(event.queryStringParameters, schema);
        if (validationResult.errors.length > 0) {
            throw new createError.BadRequest(JSON.stringify({ error: `is an invalid input`, errorTrace: validationResult.errors }));
        }
    }

    return {
        before
    }
}