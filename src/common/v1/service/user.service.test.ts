import { dynamoDBClient } from "../../database/dynamo.db";
import { User } from "../model/user.model";

describe('additionService', () => {

    it('should load a list of users', async () => {
        const user = new User(dynamoDBClient());
        const result = await user.getAll();
        expect(result).toEqual(user);
    });

    it('should create an user', async () => {
        const user = new User(dynamoDBClient());
        user.id = "a"
        user.password = "password"
        user.status = true
        user.username = "mononise"
        const result = await user.create(user);
        expect(result).toEqual(user);
    });

});
