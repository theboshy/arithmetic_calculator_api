import { RecordInterface } from "../interface/record.interface";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { InternalResponseInterface, InternalResponsePaginatedInterface } from "../interface/internal.response";

export class UserRecord implements RecordInterface {
    id: string;
    operationId: string;
    userId: string;
    amount: number;
    userBalance: number;
    operationResponse: any;
    date: string;
    last: boolean;
    tableName: string = "UserRecord";

    constructor(private docClient: DocumentClient) { //should use dependency injection instead
        this.docClient = docClient;
    }

    async getAllByUser(limit: number = 100, lastEvaluatedKey: string, userId: string): Promise<InternalResponsePaginatedInterface> {
        try {
            let params = {
                TableName: this.tableName,
                FilterExpression: 'userId = :userId',
                ExpressionAttributeValues: {
                    ':userId': userId,
                },
                Limit: limit,
            };
            if (lastEvaluatedKey) {
                params["ExclusiveStartKey"] = { id: lastEvaluatedKey };
            }
            const { Items, LastEvaluatedKey } = await this.docClient.scan(params).promise()
            if (!Items || Items.length === 0) {
                return { error: true, errorTrace: "user records is void" }
            }
            return { error: false, response: { items: Items as [UserRecord], lastEvaluatedKey: LastEvaluatedKey } }
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }


    async getAll(limit: number = 100, lastEvaluatedKey: string): Promise<InternalResponsePaginatedInterface> {
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
                return { error: true, errorTrace: "user records is void" }
            }
            return { error: false, response: { items: Items as [UserRecord], lastEvaluatedKey: LastEvaluatedKey } }
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }

    async update(id: string, properties: any): Promise<InternalResponseInterface> {
        try {
            //todo: move this serializer to an utils folder
            let updateExpression = "SET ";
            let expressionAtributeNames = {}
            let expressionAtributeValues = {}
            let entries = Object.entries(properties).length
            for (const [key, value] of Object.entries(properties)) {
                const separator = entries > 1 ? ", " : ""
                updateExpression += `#${key} = :${key}${separator}`;
                expressionAtributeNames[`#${key}`] = key
                expressionAtributeValues[`:${key}`] = value
                entries--;
            }
            const userRecordDocument = this.toDocument();
            const params = {
                TableName: this.tableName,
                Key: { id },
                UpdateExpression: updateExpression,
                ExpressionAttributeNames: expressionAtributeNames,
                ExpressionAttributeValues: expressionAtributeValues
            }
            await this.docClient.update(params).promise()
            return { error: false, response: userRecordDocument };
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }


    async create(): Promise<InternalResponseInterface> {
        try {
            const userRecordDocument = this.toDocument();
            await this.docClient.put({
                TableName: this.tableName,
                Item: userRecordDocument
            }).promise()
            return { error: false, response: userRecordDocument };
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }

    async getLast(userId: string): Promise<InternalResponseInterface> {
        try {
            const params = {
                TableName: this.tableName,
                FilterExpression: 'userId = :userId and #LS = :val',
                ExpressionAttributeNames: { "#LS": "last" },
                ExpressionAttributeValues: {
                    ':userId': userId,
                    ':val': true
                }
            };
            const { Items } = await this.docClient.scan(params).promise();
            if (!Items || Items.length === 0) {
                return { error: true, errorTrace: "user have no records" }
            }
            return { error: false, response: Items[0] as UserRecord };
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }

    toDocument() {
        try {
            const params = {
                id: this.id,
                operationId: this.operationId,
                userId: this.userId,
                amount: this.amount,
                userBalance: this.userBalance,
                operationResponse: this.operationResponse,
                date: this.date,
                last: this.last
            };
            return params;
        } catch (error) {
            console.log("error: ", error)
        }
    }

}