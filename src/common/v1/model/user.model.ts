import { InternalResponseInterface } from "../interface/internal.response";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { UserInterface } from "../interface/user.interface";

export class User implements UserInterface {
    tableName: string = "Users";
    id: string;
    username: string;
    password: string;
    status: boolean;

    constructor(private docClient: DocumentClient) { //should use dependency injection instead
        this.docClient = docClient;
    }

    async exists(username: string): Promise<InternalResponseInterface> {
        try {
            const params = {
                TableName: this.tableName,
                Key: { username: username },
            };
            const { Item } = await this.docClient.get(params).promise();
            if (!Item) {
                return { error: true, errorTrace: "username is incorrect" }
            }
            return { error: false, response: Item.username };
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }

    async login(username: string): Promise<InternalResponseInterface> {
        try {
            const params = {
                TableName: this.tableName,
                Key: { username: username },
            };
            const { Item } = await this.docClient.get(params).promise();
            if (!Item) {
                return { error: true, errorTrace: "username is incorrect" }
            }
            return { error: false, response: Item.password };
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }

    async getAll(): Promise<InternalResponseInterface> {
        throw new Error("Not implemented");
    }
    async get(username: string): Promise<InternalResponseInterface> {
        try {
            const params = {
                TableName: this.tableName,
                Key: { username: username },
            };
            const { Item } = await this.docClient.get(params).promise();
            if (!Item) {
                return { error: true, errorTrace: "username is incorrect" }
            }
            return { error: false, response: Item as User };
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }

    async create(): Promise<InternalResponseInterface> {
        try {
            const userDocument = this.toDocument();
            await this.docClient.put({
                TableName: this.tableName,
                Item: userDocument
            }).promise()
            delete userDocument.password;
            return { error: false, response: userDocument.username };
        } catch (error) {
            return { error: true, errorTrace: error };
        }
    }
    async detelete(id: string): Promise<boolean> {
        console.log(id)
        throw new Error("Method not implemented.");
    }
    async remove(id: string): Promise<boolean> {
        console.log(id)
        throw new Error("Method not implemented.");
    }

    toDocument = (): any => {
        try {
            const params = {
                id: this.id,
                username: this.username,
                password: this.password,
                status: this.status,
            };
            return params;
        } catch (error) {
            return error
        }
    }

}