import { dynamoDBClient } from "../../../../src/common/database/dynamo.db";
import { InternalResponse, InternalResponsePaginated } from "../model/internal.response";
import { UserRecord } from "../model/user.record.model";
import { User } from "../model/user.model";
import { Operation } from "../model/operation.model";
import { v4 } from "uuid";

export const userCreateRecordService = async (user: User, operation: Operation, operationResponse: any, balance?: number, last?: boolean): Promise<InternalResponse> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const dynamodbConection = dynamoDBClient();
        const userRecord = new UserRecord(dynamodbConection);
        userRecord.id = v4();
        userRecord.userId = user.id;
        userRecord.operationId = operation.id;
        userRecord.amount = operation.cost;
        userRecord.date = new Date().toISOString();
        userRecord.operationResponse = operationResponse
        userRecord.userBalance = balance;
        userRecord.last = last;
        internalResponse = await userRecord.create();
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = "An internal error occurred";
    }
    return internalResponse;
}

/**

Retrieves the last record of a user from DynamoDB.
@param username The username of the user to get the last record for.
@param userId The ID of the user to get the last record for. (if already have the userId, just set username to null)
@returns A Promise that resolves to an InternalResponse containing the result of the operation.
*/
export const userGetLastRecord = async (userId: string): Promise<InternalResponse> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const dynamodbConection = dynamoDBClient();
        let userRecord = new UserRecord(dynamodbConection);
        const lastRecordOfUser = await userRecord.getLast(userId);
        internalResponse = lastRecordOfUser;
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = "An internal error occurred";
    }
    return internalResponse;
}

export const updatetRecord = async (id: string, properties: any): Promise<InternalResponse> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const dynamodbConection = dynamoDBClient();
        let userRecord = new UserRecord(dynamodbConection);
        if (properties.hasOwnProperty("id")) {
            delete properties.id;
        }
        const lastRecordOfUser = await userRecord.update(id, properties);
        internalResponse = lastRecordOfUser;
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
    }
    return internalResponse;
}

export const userRecordGetAllService = async (limit: number = 100, lastEvaluatedKey?: string): Promise<InternalResponsePaginated> => {
    let internalResponse: InternalResponsePaginated = new InternalResponsePaginated;
    try {
        const record = new UserRecord(dynamoDBClient());
        internalResponse = await record.getAll(limit, lastEvaluatedKey);
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = "An internal error occurred";
    }
    return internalResponse;
}

export const userRecordGetAllByUserService = async (username: string, limit: number = 100, lastEvaluatedKey?: string): Promise<InternalResponsePaginated> => {
    let internalResponse: InternalResponsePaginated = new InternalResponsePaginated();
    try {
        const dynamodbConection = dynamoDBClient()
        const user = new User(dynamodbConection)
        const record = new UserRecord(dynamodbConection);
        const operation = new Operation(dynamodbConection)
        const userRelation = await user.get(username)
        internalResponse = await record.getAllByUser(limit, lastEvaluatedKey, userRelation.response.id);
        if (!internalResponse.error) {
            const records = internalResponse.response.items;
            if (records) {
                records.map(async (record: UserRecord) => {
                    const recordParsedWithRelations = record;
                    const operationRelation = await (await operation.get(record.operationId)).response as Operation
                    if (operationRelation) {
                        recordParsedWithRelations.userId = operationRelation.type
                    }
                });
            } else {

            }
        }
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = "An internal error occurred";
    }
    return internalResponse;
}