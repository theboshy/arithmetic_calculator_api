import { dynamoDBClient } from "../../../../src/common/database/dynamo.db";
import { InternalResponse } from "../model/internal.response";
import { UserRecord } from "../model/user.record.model";
import { User } from "../model/user.model";
import { Operation } from "../model/operation.model";
import { v4 } from "uuid";

export const userRecordService = async (username: string, operationId: string, operationResponse: any): Promise<InternalResponse> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const dynamodbConection = dynamoDBClient();
        const userRecord = new UserRecord(dynamodbConection);
        const user = new User(dynamodbConection);
        const userResult = await user.get(username);
        if (userResult.error) {
            internalResponse = userResult
            internalResponse.status = 404
            return internalResponse;
        }
        const lastRecordOfUser = await userRecord.getLast(userResult.response.id);
        if (lastRecordOfUser.errorTrace === "userId is incorrect" || lastRecordOfUser.response === undefined) {//create initial user balance record (todo: ensure only when there is no records of balance)
            userRecord.userBalance = parseInt(process.env.INITIAL_USER_BALANCE);
        } else {
            userRecord.userBalance = lastRecordOfUser.response.userBalance;
        }
        const operation = new Operation(dynamodbConection);
        const operationResult = await operation.get(operationId);
        if (operationResult.error) {
            internalResponse = operationResult
            internalResponse.status = 404
            return operationResult;
        }
        Math.abs(userRecord.userBalance -= operationResult.response.cost);
        userRecord.id = v4();
        internalResponse = await userRecord.create(userResult.response, operationResult.response, operationResponse);
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
    }
    return internalResponse;
}