import { User } from "../model/user.model";

export interface UserInterface {
    id: string;
    username: string;
    passwor: string;
    status: boolean;
    getAll(): Promise<[User]>
    get(id: string): Promise<User>
    create(user: User): Promise<User>
    detelete(id: string): Promise<boolean>
    remove(id: string): Promise<boolean>
}