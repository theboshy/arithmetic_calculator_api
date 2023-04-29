import { RecordInterface } from "../interface/record.interface";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { InternalResponseInterface } from "../interface/internal.response";
import { User } from "./user.model";
import { Operation } from "./operation.model";

export class UserRecord implements RecordInterface {
    id: string;
    operationId: string;
    userId: string;
    amount: number;
    userBalance: number;
    operationResponse: any;
    date: string;
    tableName: string = "UserRecord";

    constructor(private docClient: DocumentClient) { //should use dependency injection instead
        this.docClient = docClient;
    }


    async create(user: User, operation: Operation, operationResponse: any): Promise<InternalResponseInterface> {
        try {
            this.userId = user.id;
            this.operationId = operation.id;
            this.amount = operation.cost;
            this.date = new Date().toISOString();
            this.operationResponse = operationResponse
            const userRecordDocument = this.toDocument();
            await this.docClient.put({
                TableName: this.tableName,
                Item: userRecordDocument
            }).promise()
            return { error: false, response: userRecordDocument.id };
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }

    async getLast(userId: string): Promise<InternalResponseInterface> {
        try {
            const params = {
                TableName: this.tableName,
                FilterExpression: 'userId = :uid',
                ExpressionAttributeValues: {
                    ':uid': userId,
                },
                Limit: 1,
                ScanIndexForward: false,
            };
            const { Items } = await this.docClient.scan(params).promise();
            if (!Items) {
                return { error: true, errorTrace: "userId is incorrect" }
            }
            return { error: false, response: Items[0] as User };
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
                date: this.date
            };
            return params;
        } catch (error) {
            console.log("error: ", error)
        }
    }

}