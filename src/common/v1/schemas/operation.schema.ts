export const  operationRequestSchema = {
    type: "object",
    properties: {
        limit: {
            type: "string"
        },
        lastEvaluatedKey: {
            type: "string"
        }
    },
    required: ["limit"]
}
