import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { InternalResponse } from 'src/common/v1/model/internal.response';
import { getUser, userLoginService } from 'src/common/v1/service/user.service';
import createError from 'http-errors';

export const verifyUserLoginMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
    const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ): Promise<void> => {
        const { event } = request;
        const { username, password } = event.body as any;
        let internalResponse: InternalResponse = new InternalResponse();
        internalResponse = await userLoginService(username, password);
        if (internalResponse.error) {
            switch (internalResponse.errorTrace) {
                case "password is incorrect": {
                    throw new createError.Unauthorized(JSON.stringify(internalResponse));
                }
                case "username is incorrect": {
                    delete internalResponse.response;
                    throw new createError.NotFound(JSON.stringify(internalResponse));
                }
            }
        }
    }

    return {
        before
    }
}


export const verifyUserRegisterMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
    const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ): Promise<void> => {
        const { event } = request;
        const { username } = event.body as any;
        let internalResponse: InternalResponse = new InternalResponse();
        internalResponse = await getUser(username);
        if (!internalResponse.error && internalResponse.response) {
            throw new createError.Conflict(JSON.stringify({ error: true, errorTrace: "user already exists" }));
        }
    }

    return {
        before
    }
}
