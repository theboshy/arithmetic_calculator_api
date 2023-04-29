import { InternalResponseInterface } from "./internal.response";

export interface UserInterface {
    id: string;
    username: string;
    password: string;
    status: boolean;
    tableName: string;
    getAll(): Promise<InternalResponseInterface>
    get(id: string): Promise<InternalResponseInterface>
    create(): Promise<InternalResponseInterface>
    detelete(id: string): Promise<boolean>
    remove(id: string): Promise<boolean>
}