import middy from "@middy/core";
import { APIGatewayProxyEvent } from "aws-lambda";
import createError from 'http-errors';
import { proxySchemaValidator } from "./proxy.schema.validator";

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
            body: {
                "password": "secret"
            }
        } as any;
        const request: middy.Request = { event } as any;
        const middleware = proxySchemaValidator(schema);
        await expect(middleware.before(request)).rejects.toThrowError(createError.BadRequest);
    });

    test("should throw BadRequest when pass invalid request parameters", async () => {
        const event: APIGatewayProxyEvent = {
            body: {
                "name": 2,
                "password": "secret"
            }
        } as any;
        const request: middy.Request = { event } as any;
        const middleware = proxySchemaValidator(schema);
        await expect(middleware.before(request)).rejects.toThrowError(createError.BadRequest);
    });


    test("should pass on valid request parameters", async () => {
        const event: APIGatewayProxyEvent = {
            body: {
                "name": "mononise"
            }
        } as any;
        const request: middy.Request = { event } as any;
        const middleware = proxySchemaValidator(schema);
        await expect(typeof middleware.before(request)).toBe("object")
    });

});
