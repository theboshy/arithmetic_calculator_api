import middy from '@middy/core';
import createError from 'http-errors';
import { costPerRequestMiddleware } from './cost.per.request.middleware';
import { CustomAPIGatewayProxyEvent } from '@libs/api-gateway';
import { APIGatewayProxyResult } from 'aws-lambda';


describe('costPerRequestMiddleware', () => {
    const mockRequest = {
        event: {
            decoded: {
                user: 'testuser',
            },
            queryStringParameters: {
                operationId: 'testoperation',
            },
        },
    } as unknown as middy.Request<CustomAPIGatewayProxyEvent, APIGatewayProxyResult>;

    const user = {
        username: "test",
        password: "test123",
    }


    test('should throw NotFound if user is not provided in the request', async () => {
        const request = { ...mockRequest };
        request.event.decoded.user = undefined;
        const middleware = costPerRequestMiddleware();
        await expect(middleware.before(request)).rejects.toThrowError(createError.BadRequest);
    });

    test('should throw NotFound if user dont exist', async () => {
        const request = { ...mockRequest };
        request.event.decoded.user = user.username;
        const middleware = costPerRequestMiddleware();
        await expect(middleware.before(request)).rejects.toThrowError(createError.NotFound);
    });

    //add subtraction from user balance test cases

});