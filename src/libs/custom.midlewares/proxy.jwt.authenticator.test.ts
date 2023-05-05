import middy from "@middy/core";
import { APIGatewayProxyEvent } from "aws-lambda";
import { proxyJWTAuthenticator } from "./proxy.jwt.authenticator";
import createError from 'http-errors';

describe('proxyJWTAuthenticator', () => {
    test("should throw Unauthorized if x-access-token is null", async () => {
        const event: APIGatewayProxyEvent = { headers: [] } as any;
        const request: middy.Request = { event } as any;
        const middleware = proxyJWTAuthenticator();
        await expect(middleware.before(request)).rejects.toThrowError(createError.Unauthorized);
    });

    test("should throw Unauthorized if x-access-token is invalid", async () => {
        const event: APIGatewayProxyEvent = { headers: [{ "x-access-token": "some random token" }] } as any;
        const request: middy.Request = { event } as any;
        const middleware = proxyJWTAuthenticator();
        await expect(middleware.before(request)).rejects.toThrowError(createError.Unauthorized);
    });


});
