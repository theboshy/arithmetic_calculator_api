import { dynamoDBClient } from "../../../common/database/dynamo.db";
import { InternalResponseInterface } from "../interface/internal.response";
import { InternalResponse } from "../model/internal.response";
import { OperationModel } from "../model/operation.model";

export const operationBatchWriteService = async (operations: [OperationModel]): Promise<InternalResponseInterface> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const operation = new OperationModel(dynamoDBClient());
        internalResponse = await operation.batchWriteItem(operations);
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
    }
    return internalResponse;
}

export const operationGetAllService = async (limit: number = 100, lastEvaluatedKey?: string): Promise<InternalResponseInterface> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const operation = new OperationModel(dynamoDBClient());
        internalResponse = await operation.getAll(limit, lastEvaluatedKey);
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
    }
    return internalResponse;
}