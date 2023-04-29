import { PropertiesRequestItems, convertToRequestItems } from "@libs/dynamo.request.resolver/properties.to.dynamo.request";
import { InternalResponseInterface } from "../interface/internal.response";
import { OperationInterface } from "../interface/operation.interface";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export class OperationModel implements OperationInterface {
    id: string;
    type: string;
    cost: number;
    tableName: string = "Operation";

    constructor(private docClient: DocumentClient) { //should use dependency injection instead
        this.docClient = docClient;
    }

    async getAll(limit: number = 100, lastEvaluatedKey?: string): Promise<InternalResponseInterface> {
        console.log(lastEvaluatedKey)
        try {
            let params = {
                TableName: this.tableName,
                Limit: limit,
            };
            if (lastEvaluatedKey) {
                params["ExclusiveStartKey"] = {id: lastEvaluatedKey};
            }
            const operations = await this.docClient.scan(params).promise()
            return { error: false, response: operations }
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }


    async batchWriteItem(items: [any]): Promise<InternalResponseInterface> {
        const requestItems: PropertiesRequestItems = convertToRequestItems(items);
        const params = {
            RequestItems: {
                ...requestItems
            }
        }
        try {
            await this.docClient.batchWrite(params).promise();
            return { error: false, response: `${items.length} documents created in ${this.tableName} table` }
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }

}
