import { Operation } from "../model/operation.model";
import { User } from "../model/user.model";
import { InternalResponseInterface } from "./internal.response";

export interface RecordInterface {
    id: string;
    operationId: string;
    userId: string;
    amount: number;
    userBalance: number;
    operationResponse: any;
    date: string;
    last: boolean;
    tableName: string;
    create(user: User, operation: Operation, operationResponse: any): Promise<InternalResponseInterface>
    getLast(userId: string): Promise<InternalResponseInterface>;
    update(userId: string, properties: Map<String, any>): Promise<InternalResponseInterface>
    toDocument(): any
}