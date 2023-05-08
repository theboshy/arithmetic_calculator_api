import { APIGatewayProxyEvent } from "aws-lambda";
import { queryParamMiddleware } from "./arithmetic.query.numbers.validator.operator";
import middy from "@middy/core";
import createError from 'http-errors';

describe("queryParamMiddleware", () => {
    test("should throw BadRequest if queryStringParameters is null", async () => {
        const event: APIGatewayProxyEvent = { queryStringParameters: null } as any;
        const request: middy.Request = { event } as any;
        const middleware = queryParamMiddleware();
        await expect(middleware.before(request)).rejects.toThrowError(createError.BadRequest);
    });

    test("should throw BadRequest if queryStringParameters validation failed", async () => {
        const event: APIGatewayProxyEvent = { path: "/default", queryStringParameters: { numberA: "abc" } } as any;
        const request: middy.Request = { event } as any;
        const middleware = queryParamMiddleware();
        await expect(middleware.before(request)).rejects.toThrowError(createError.BadRequest);
    });

    test("should throw BadRequest if numberA is not a number", async () => {
        const event: APIGatewayProxyEvent = { path: "/default", queryStringParameters: { numberA: "abc", numberB: "2" } } as any;
        const request: middy.Request = { event } as any;
        const middleware = queryParamMiddleware();
        await expect(middleware.before(request)).rejects.toThrowError(createError.BadRequest);
    });

    test("should throw BadRequest if numberB is not a number", async () => {
        const event: APIGatewayProxyEvent = { path: "/default", queryStringParameters: { numberA: "1", numberB: "abc" } } as any;
        const request: middy.Request = { event } as any;
        const middleware = queryParamMiddleware();
        await expect(middleware.before(request)).rejects.toThrowError(createError.BadRequest);
    });

    test("should throw BadRequest if numberB is 0 for division", async () => {
        const event: APIGatewayProxyEvent = { path: "/division", queryStringParameters: { numberA: "1", numberB: "0" } } as any;
        const request: middy.Request = { event } as any;
        const middleware = queryParamMiddleware();
        await expect(middleware.before(request)).rejects.toThrowError(createError.BadRequest);
    });

    test("should pass if all validations are passed", async () => {
        const event: APIGatewayProxyEvent = { path: "/default", queryStringParameters: { numberA: "1", numberB: "2" } } as any;
        const request: middy.Request = { event } as any;
        const middleware = queryParamMiddleware();
        await expect(middleware.before(request)).resolves.toBeUndefined();
    });

    test("should pass if all validations are passed for squareRoot", async () => {
        const event: APIGatewayProxyEvent = { path: "/squareRoot", queryStringParameters: { numberA: "4" } } as any;
        const request: middy.Request = { event } as any;
        const middleware = queryParamMiddleware();
        await expect(middleware.before(request)).resolves.toBeUndefined();
    });

    test("should throw BadRequest if numberA is negative for squareRoot", async () => {
        const event: APIGatewayProxyEvent = { path: "/squareRoot", queryStringParameters: { numberA: "-1" } } as any;
        const request: middy.Request = { event } as any;
        const middleware = queryParamMiddleware();
        await expect(middleware.before(request)).rejects.toThrowError(createError.BadRequest);
    });
});
