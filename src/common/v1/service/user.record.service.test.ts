import { v4 } from "uuid";
import { Operation } from "../model/operation.model";
import { User } from "../model/user.model";
import { updatetRecord, userCreateRecordService, userGetLastRecord } from "./user.record.service";

const user = {
    id: v4(),
}

const operation = {
    id: v4(),
    cost: 11,
}

let lastRecord;

const operationResponse = 10;
const balance = 198;

describe("user record service", () => {
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