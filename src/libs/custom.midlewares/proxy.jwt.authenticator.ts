import { jwtVerify } from '@libs/jwt/jwt.handler';
import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import createError from 'http-errors';


export const proxyJWTAuthenticator = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
    const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ): Promise<void> => {
        const { event } = request;
        const token = event.headers['x-access-token']

        if (!token) {
            throw new createError.Unauthorized(JSON.stringify({ error: `Unauthorized` }));
        }

        await jwtVerify(token)
            .then(decoded => {
                //event.body = JSON.parse(decoded)
                console.log(decoded)
            })
            .catch(err => {
                throw new createError.Unauthorized(JSON.stringify({ error: `Unauthorized: ${err}` }));
            });
    }

    return {
        before
    }
}