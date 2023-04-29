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

    async login(username: string): Promise<InternalResponseInterface> {
        try {
            const params = {
                TableName: this.tableName,
                Key: { username: username},
            };
            const { Item } = await this.docClient.get(params).promise();
            if (!Item) {
                return { error: true, response: undefined, errorTrace: "user don`t exist" }
            }
            return {error: false, response: Item.password.S};
        } catch (error) {
            return { error: true, errorTrace: error }
        }
    }

    async getAll(): Promise<InternalResponseInterface> {
        throw new Error("Not implemented");
    }
    async get(id: string): Promise<InternalResponseInterface> {
        console.log(id)
        throw new Error("Method not implemented.");
    }
    async create(): Promise<InternalResponseInterface> {
        try {
            const userDocument = this.toDocument();
            await this.docClient.put({
                TableName: this.tableName,
                Item: userDocument
            }).promise()
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

    toDocument = () => {
        try {
            const params = {
                id: this.id,
                username: this.username,
                password: this.password,
                status: this.status,
            };
            return params;
        } catch (error) {
            console.log("error: ", error)
        }
    }

}