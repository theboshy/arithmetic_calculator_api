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


export const userRecordDeleteRequestSchema = {
    type: "object",
    properties: {
        userRecordId: {
            type: "array"
        },
    },
    required: ['userRecordId']
}
