import middy from "@middy/core";
import { APIGatewayProxyEvent } from "aws-lambda";
import { proxySchemaQueryValidator } from "./proxy.schema.query.validator";
import createError from 'http-errors';

describe('proxy schema validator', () => {

    const schema = {
        type: "object",
        properties: {
            name: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['name']
    } as const;


    test("should throw BadRequest when pass missing request parameters", async () => {
        const event: APIGatewayProxyEvent = {
            queryStringParameters: {
                "password": "secret"
            }
        } as any;
        const request: middy.Request = { event } as any;
        const middleware = proxySchemaQueryValidator(schema);
        await expect(middleware.before(request)).rejects.toThrowError(createError.BadRequest);
    });

    test("should throw BadRequest when pass invalid request parameters", async () => {
        const event: APIGatewayProxyEvent = {
            queryStringParameters: {
                "name": 2,
                "password": "secret"
            }
        } as any;
        const request: middy.Request = { event } as any;
        const middleware = proxySchemaQueryValidator(schema);
        await expect(middleware.before(request)).rejects.toThrowError(createError.BadRequest);
    });


    test("should pass on valid request parameters", async () => {
        const event: APIGatewayProxyEvent = {
            queryStringParameters: {
                "name": "mononise"
            }
        } as any;
        const request: middy.Request = { event } as any;
        const middleware = proxySchemaQueryValidator(schema);
        await expect(typeof middleware.before(request)).toBe("object")
    });

});
