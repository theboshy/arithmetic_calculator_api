import { userRegisterService } from "../../common/v1/service/user.service";
import { verifyUserLoginMiddleware } from "./proxy.user.validator";
import { APIGatewayProxyEvent } from "aws-lambda";
import middy from "@middy/core";
import createError from 'http-errors';

const user = {
    username: "test",
    password: "test123",
}

describe("user validator proxy", () => {
    test('should register an user', async () => {
        expect.assertions(3);
        const result = await userRegisterService(user.username, user.password);
        expect(typeof result).toBe('object')
        expect(result.error).toBeFalsy()
        expect(result.response).toBe(user.username)
    });

    test('should return error if user does not exist', async () => {
        const event: APIGatewayProxyEvent = {
            body: {
                username: "test2",
                password: "test1232",
            }
        } as any;
        const request: middy.Request = { event } as any;
        const middleware = verifyUserLoginMiddleware();
        await expect(middleware.before(request)).rejects.toThrowError(createError.NotFound);
    });

    test('should return error if password does not match', async () => {
        const event: APIGatewayProxyEvent = {
            body: {
                username: "test",
                password: "test1232",
            }
        } as any;
        const request: middy.Request = { event } as any;
        const middleware = verifyUserLoginMiddleware();
        await expect(middleware.before(request)).rejects.toThrowError(createError.Unauthorized);
    });

    test('should return error if password does not match', async () => {
        const event: APIGatewayProxyEvent = {
            body: {
                username: "test",
                password: "test123",
            }
        } as any;
        const request: middy.Request = { event } as any;
        const middleware = verifyUserLoginMiddleware();
        await expect(typeof middleware.before(request)).toBe("object")
    });

})