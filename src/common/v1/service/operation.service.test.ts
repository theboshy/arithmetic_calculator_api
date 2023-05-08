import { operationBatchWriteService, operationGetAllService } from "./operation.service";
import operationSeed from '../../../common/seeds/operation.seed/seed.json';
import { Operation } from "../model/operation.model";

describe("operation service", () => {
    test('should poblate the operation table', async () => {
        expect.assertions(2);
        const result = await operationBatchWriteService(operationSeed as [Operation]);
        expect(result.error).toBeFalsy()
        expect(typeof result.response).toBe('string')
    });

    test('should get operations from the operation table', async () => {
        expect.assertions(4);
        const result = await operationGetAllService();
        expect(result.error).toBeFalsy()
        expect(typeof result.response).toBe('object')
        expect(typeof result.response.items).toBe('object')
        expect(result.response.items.length).toBeGreaterThan(0)
    });

    test('should get operation from the operation table with pagination limit 1', async () => {
        expect.assertions(4);
        const result = await operationGetAllService(1);
        expect(result.error).toBeFalsy()
        expect(typeof result.response.items).toBe('object')
        expect(typeof result.response.lastEvaluatedKey).toBe('object')
        expect(result.response.items.length).toBe(1)
    });
})