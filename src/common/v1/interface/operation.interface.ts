import { Operation } from "../model/operation.model";
import { InternalResponseInterface } from "./internal.response";

export interface OperationInterface {
    id: string;
    type: string;
    cost: number;
    tableName: string;
    batchWriteItem(items: [Operation]): Promise<InternalResponseInterface>
    getAll(limit: number, lastEvaluatedKey?:string): Promise<InternalResponseInterface>
    get(id: string): Promise<InternalResponseInterface>
}