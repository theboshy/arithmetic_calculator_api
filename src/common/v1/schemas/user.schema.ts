export const userRegisterSchema = {
    type: "object",
    properties: {
        username: {
            type: "string"
        },
        password: {
            type: "string",
            minLength: 64,
            maxLength: 64,
            pattern: "^[a-f0-9]{64}$"
        },
    },
    "required": ["username", "password"]
}