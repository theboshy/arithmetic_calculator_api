import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

type ValidatedAPIGatewayProxyEventParams<S> = Omit<APIGatewayProxyEvent, 'queryStringParameters'> & { queryStringParameters: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyEventParams<S> = Handler<ValidatedAPIGatewayProxyEventParams<S>, APIGatewayProxyResult>;

export interface CustomAPIGatewayProxyEvent extends APIGatewayProxyEvent {
  decoded: any
}

export const formatJSONResponse = (status: number, response: Record<string, unknown>) => {
  return {
    statusCode: status,
    body: JSON.stringify(response)
  }
}
