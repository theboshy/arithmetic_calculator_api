import { PropertiesRequestItems, convertToRequestItems } from "../../../libs/dynamo.request.resolver/properties.to.dynamo.request";
import { InternalResponseInterface, InternalResponsePaginatedInterface } from "../interface/internal.response";
import { OperationInterface } from "../interface/operation.interface";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export class Operation implements OperationInterface {
    id: string;
    type: string;
    cost: number;
    tableName: string = "Operation";

    constructor(private docClient: DocumentClient) { //should use dependency injection instead
        this.docClient = docClient;
    }

    async get(id: string): Promise<InternalResponseInterface> {
        try {
            const params = {
                TableName: this.tableName,
                Key: { id },
            };
            const { Item } = await this.docClient.get(params).promise();
            if (!Item) {
                return { error: true, errorTrace: "operation id not found" }
            }
            return { error: false, response: Item as Operation };
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }

    async getAll(limit: number = 100, lastEvaluatedKey?: string): Promise<InternalResponsePaginatedInterface> {
        try {
            let params = {
                TableName: this.tableName,
                Limit: limit,
            };
            if (lastEvaluatedKey) {
                params["ExclusiveStartKey"] = { id: lastEvaluatedKey };
            }
            const { Items, LastEvaluatedKey } = await this.docClient.scan(params).promise()
            if (!Items || Items.length === 0) {
                return { error: true, errorTrace: "operations is void" }
            }
            return { error: false, response: { items: Items as [Operation], lastEvaluatedKey: LastEvaluatedKey } }
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
