import { dynamoDBClient } from "../../../common/database/dynamo.db";
import { InternalResponseInterface } from "../interface/internal.response";
import { InternalResponse, InternalResponsePaginated } from "../model/internal.response";
import { Operation } from "../model/operation.model";

export const operationBatchWriteService = async (operations: [Operation]): Promise<InternalResponseInterface> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const operation = new Operation(dynamoDBClient());
        internalResponse = await operation.batchWriteItem(operations);
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
    }
    return internalResponse;
}

export const operationGetAllService = async (limit: number = 100, lastEvaluatedKey?: string): Promise<InternalResponsePaginated> => {
    let internalResponse: InternalResponsePaginated = new InternalResponsePaginated;
    try {
        const operation = new Operation(dynamoDBClient());
        internalResponse = await operation.getAll(limit, lastEvaluatedKey);
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
    }
    return internalResponse;
}

export const operationGetService = async (operationId: string): Promise<InternalResponseInterface> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const operation = new Operation(dynamoDBClient());
        internalResponse = await operation.get(operationId);
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
    }
    return internalResponse;
}