export const userRegisterSchema = {
    type: "object",
    properties: {
        username: {
            type: "string"
        },
        password: {
            type: "string",
            //pattern: "^\\$2[ayb]\\$[0-9]{2}\\$[./0-9A-Za-z]{53}$" //validates bcrypt type password
        },
    },
    "required": ["username", "password"]
}

export const userLoginSchema = {
    type: "object",
    properties: {
        username: {
            type: "string"
        },
        password: {
            type: "string",
            //pattern: "^\\$2[ayb]\\$[0-9]{2}\\$[./0-9A-Za-z]{53}$"
        },
    },
    "required": ["username", "password"]
}