export const userRecordRequestSchema = {
    type: "object",
    properties: {
        limit: {
            type: "string"
        },
        lastEvaluatedKey: {
            type: "string"
        },
    },
}
