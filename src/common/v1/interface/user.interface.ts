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
    login(username: string, password: string): Promise<InternalResponseInterface>
    exists(username: string): Promise<InternalResponseInterface>
    toDocument(): any
}