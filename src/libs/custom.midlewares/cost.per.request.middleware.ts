import { CustomAPIGatewayProxyEvent } from '@libs/api-gateway';
import middy from '@middy/core';
import { APIGatewayProxyResult } from 'aws-lambda';
import { updatetRecord, userCreateRecordService, userGetLastRecord } from 'src/common/v1/service/user.record.service';
import createError from 'http-errors';
import { getUser } from 'src/common/v1/service/user.service';
import { operationGetService } from 'src/common/v1/service/operation.service';

//todo: better to reuse the event varaibles and loaded from database (declare in before use in before and after)
export const costPerRequestMiddleware = (): middy.MiddlewareObj<CustomAPIGatewayProxyEvent, APIGatewayProxyResult> => {
    const before: middy.MiddlewareFn<CustomAPIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ): Promise<void> => {
        const { event } = request;
        const { user } = event.decoded;
        const { operationId } = event.queryStringParameters;
        if (!user) {
            throw new createError.BadGateway(JSON.stringify({ error: `Credentials not found` }));
        }
        const userFroMdB = await getUser(user)
        if (userFroMdB.error) {
            throw new createError.BadGateway(JSON.stringify({ error: `User not found` }));
        }
        const lastRecordFromDb = await userGetLastRecord(userFroMdB.response.id)
        const operationFromDb = await operationGetService(operationId);
        if (operationFromDb.error) {
            throw new createError.BadGateway(JSON.stringify({ error: `Operation not found` }));
        }
        if (!lastRecordFromDb.error) {
            const result = lastRecordFromDb.response.userBalance - operationFromDb.response.cost;
            if (result < 0) {
                throw new createError.PaymentRequired(JSON.stringify({ error: `Client don't have enougth credits to perform this request` }));
            }
        }
    }

    const after: middy.MiddlewareFn<CustomAPIGatewayProxyEvent, APIGatewayProxyResult> = async (
        request
    ): Promise<void> => {
        const { event } = request;
        const { user } = event.decoded;
        const { operationId } = event.queryStringParameters;
        if (!user) {
            throw new createError.BadGateway(JSON.stringify({ error: `Credentials not found` }));
        }
        const userFroMdB = await getUser(user)
        if (userFroMdB.error) {
            throw new createError.BadGateway(JSON.stringify({ error: `User not found` }));
        }
        const lastRecordFromDb = await userGetLastRecord(userFroMdB.response.id)
        const operationFromDb = await operationGetService(operationId);
        if (operationFromDb.error) {
            throw new createError.BadGateway(JSON.stringify({ error: `Operation not found` }));
        }
        let newRecordAmount = 0;
        let initUserBalance = 0;
        let last = true;
        if (lastRecordFromDb.errorTrace === "user have no records") {
            initUserBalance = parseInt(process.env.INITIAL_USER_BALANCE);
            initUserBalance = Math.abs(initUserBalance -= operationFromDb.response.cost);
        } else if (lastRecordFromDb.response.id) {
            let lastUpdate = lastRecordFromDb.response;
            lastUpdate.last = false;
            delete lastUpdate.userId;
            const result = await updatetRecord(lastRecordFromDb.response.id, lastUpdate)
            if (result.error) {
                throw new createError.InternalServerError(JSON.stringify({ error: `Can't process request` }));
            }
            initUserBalance = Math.abs(lastRecordFromDb.response.userBalance -= operationFromDb.response.cost);
        }
        const result = await userCreateRecordService(userFroMdB.response, operationFromDb.response, newRecordAmount, initUserBalance, last);
        if (result.error) {
            throw new createError.Unauthorized(JSON.stringify({ error: `Can't process request` }));
        }
    }
    return {
        before,
        after
    }
}
