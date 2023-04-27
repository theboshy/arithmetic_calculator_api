import { UserInterface } from "../interface/user.interface";

export class User implements UserInterface {
    id: string;
    username: string;
    passwor: string;
    status: boolean;
    
    getAll(): Promise<[User]> {
        throw new Error("Method not implemented.");
    }
    get(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    create(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    detelete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    remove(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}