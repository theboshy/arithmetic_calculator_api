import { dynamoDBClient } from "../../../../src/common/database/dynamo.db";
import { InternalResponse, InternalResponsePaginated } from "../model/internal.response";
import { UserRecord } from "../model/user.record.model";
import { User } from "../model/user.model";
import { Operation } from "../model/operation.model";
import { v4 } from "uuid";
import { InternalResponsePaginatedInterface } from "../interface/internal.response";

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
        userRecord.deleted = false;
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


export const userGetRecord = async (userRecordId: string): Promise<InternalResponse> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const dynamodbConection = dynamoDBClient();
        let userRecord = new UserRecord(dynamodbConection);
        const lastRecordOfUser = await userRecord.get(userRecordId);
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

const realationStore: Record<string, string> = {

};

export const userRecordGetAllByUserService = async (username: string, limit: number = 100, lastEvaluatedKey?: string): Promise<InternalResponsePaginatedInterface> => {
    let internalResponse: InternalResponsePaginated = new InternalResponsePaginated();
    try {
        const dynamodbConnection = dynamoDBClient()
        const user = new User(dynamodbConnection)
        const record = new UserRecord(dynamodbConnection);
        const operation = new Operation(dynamodbConnection)
        const userRelation = await user.get(username)
        internalResponse = await record.getAllByUser(limit, lastEvaluatedKey, userRelation.response.id);
        let responseItems;
        if (!internalResponse.error) {
            const records = internalResponse.response.items;
            if (records.length > 0) {
                const relationMapper = records.map(async (record: UserRecord) => {
                    const recordParsedWithRelations = record;
                    if (realationStore[recordParsedWithRelations.id]) {
                        recordParsedWithRelations.operationId = realationStore[recordParsedWithRelations.id]
                    } else {
                        const operationRelation = await (await operation.get(record.operationId)).response as Operation
                        if (operationRelation) {
                            recordParsedWithRelations.operationId = operationRelation.type
                            realationStore[recordParsedWithRelations.id] = operationRelation.type
                        }
                    }
                    return recordParsedWithRelations;
                });
                responseItems = await Promise.all(relationMapper);
            } else {
                internalResponse.error = true;
                internalResponse.errorTrace = "An internal error occurred";
            }
        }
        if (responseItems) {
            internalResponse.response.items = responseItems;
        }
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = "An internal error occurred";
    }
    return internalResponse;
}