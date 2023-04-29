import { OperationModel } from "../model/operation.model";
import { InternalResponseInterface } from "./internal.response";

export interface OperationInterface {
    id: string;
    type: string;
    cost: number;
    tableName: string;
    batchWriteItem(items: [OperationModel]): Promise<InternalResponseInterface>
}