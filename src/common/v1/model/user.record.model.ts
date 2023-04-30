import { RecordInterface } from "../interface/record.interface";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { InternalResponseInterface } from "../interface/internal.response";
import { User } from "./user.model";

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

    async update(userId: string, properties: any): Promise<InternalResponseInterface> {
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
                Key: { userId },
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
                Key: { userId },
                FilterExpression: { last: true }
            };
            const { Item } = await this.docClient.get(params).promise();
            if (!Item) {
                return { error: true, errorTrace: "user have no records" }
            }
            return { error: false, response: Item as User };
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
                operation_response: this.operationResponse,
                date: this.date,
                last: this.last
            };
            return params;
        } catch (error) {
            console.log("error: ", error)
        }
    }

}