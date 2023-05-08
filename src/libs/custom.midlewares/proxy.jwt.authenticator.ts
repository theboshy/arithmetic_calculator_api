import { CustomAPIGatewayProxyEvent } from '@libs/api-gateway';
import { jwtVerify } from '../../libs/jwt/jwt.handler';
import middy from '@middy/core';
import { APIGatewayProxyResult } from 'aws-lambda';
import createError from 'http-errors';

export const proxyJWTAuthenticator = (): middy.MiddlewareObj<CustomAPIGatewayProxyEvent, APIGatewayProxyResult> => {
    const before: middy.MiddlewareFn<CustomAPIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ): Promise<void> => {
        const { event } = request;
        const token = event.headers['x-access-token']

        if (!token) {
            throw new createError.Unauthorized(JSON.stringify({ error: `Unauthorized` }));
        }

        await jwtVerify(token)
            .then(decoded => {
                event.decoded = JSON.parse(JSON.stringify(decoded))
            })
            .catch(err => {
                throw new createError.Unauthorized(JSON.stringify({ error: `Unauthorized: ${err}` }));
            });
    }

    return {
        before
    }
}