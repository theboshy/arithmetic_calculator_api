import { dynamoDBClient } from "./dynamo.db";

const dynamodb = dynamoDBClient();

describe("dynamodb", () => { 
    it("should connect to db", async () => {
        expect(typeof dynamodb).toBe('object');
    })

    it("should handle dynamodb methods", async () => {
        expect(typeof dynamodb.get).toBe('function');
        expect(typeof dynamodb.scan).toBe('function');
        expect(typeof dynamodb.query).toBe('function');
        expect(typeof dynamodb.batchWrite).toBe('function');
        expect(typeof dynamodb.put).toBe('function');
    })
});