import { v4 } from "uuid";
import { Operation } from "../model/operation.model";
import { User } from "../model/user.model";
import {
    updatetRecord,
    userCreateRecordService,
    userGetLastRecord,
    userRecordGetAllByUserService
} from "./user.record.service";
import {getUser, userRegisterService} from "./user.service";

let user = {
    id: "",
    username: "mononise",
    password: "password",
}

const operation = {
    cost: 11,
}

let lastRecord;

const operationResponse = 10;
const balance = 198;

describe("user record service", () => {

    test('should register an user', async () => {
        expect.assertions(3);
        const result = await userRegisterService(user.username, user.password);
        const userFROMdB = await getUser(user.username)
        user = userFROMdB.response;
        expect(typeof result).toBe('object')
        expect(result.error).toBeFalsy()
        expect(result.response).toBe(user.username)
    });

    test('should create a user record', async () => {
        expect.assertions(3);
        const last = true;
        const result = await userCreateRecordService(user as User, operation as Operation, operationResponse, balance, last);
        expect(typeof result).toBe('object')
        expect(result.error).toBeFalsy()
        expect(typeof result.response).toBe('object')
    });

    test('should get the last user record', async () => {
        expect.assertions(4);
        const result = await userGetLastRecord(user.id);
        lastRecord = result.response;
        expect(typeof result).toBe('object')
        expect(result.error).toBeFalsy()
        expect(typeof result.response).toBe('object')
        expect(result.response.userId).toBe(user.id)
    });

    test('should get the all the user records Exceeding the limit', async () => {
        const result = await userRecordGetAllByUserService(user.username, 3);
        const records = result.response;
        expect(typeof records.items).toBe('object')
        expect(typeof records.lastEvaluatedKey).toBe('undefined')
    });

    test('should get an error triying to get the last user record that does not exist', async () => {
        expect.assertions(3);
        const result = await userGetLastRecord(v4());
        expect(typeof result).toBe('object')
        expect(result.error).toBeTruthy()
        expect(typeof result.errorTrace).toBe('string')
    });

    test('should update a user record to be the last one of user records', async () => {
        expect.assertions(3);
        lastRecord.last = false;
        const result = await updatetRecord(lastRecord.id, lastRecord);
        expect(typeof result).toBe('object')
        expect(result.error).toBeFalsy()
        expect(typeof result.response).toBe('object')
    });
});