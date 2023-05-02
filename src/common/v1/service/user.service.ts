import { dynamoDBClient } from "src/common/database/dynamo.db";
import { InternalResponseInterface } from "../interface/internal.response";
import { InternalResponse } from "../model/internal.response";
import { User } from "../model/user.model";
import { v4 } from "uuid";
import bcrypt from 'bcryptjs';
/**

Registers a new user in the system.
@param {string} username - The username of the new user.
@param {string} password - The password of the new user, already hashed
@returns {Promise<InternalResponseInterface>} - An object containing the response or error information.
*/
export const userRegisterService = async (username: string, password: string): Promise<InternalResponseInterface> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const user = new User(dynamoDBClient());
        user.id = v4()
        user.status = true
        user.username = username;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
        internalResponse = await user.create();
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = "An internal error occurred";
    }
    return internalResponse;
}

export const userLoginService = async (username: string, password: string): Promise<InternalResponseInterface> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const user = new User(dynamoDBClient());
        internalResponse = await user.login(username);
        if (!internalResponse.response) {
            return internalResponse;
        }
        const isValidPassword = await bcrypt.compare(password, internalResponse.response);
        if (!isValidPassword) {
            internalResponse.error = true;
            internalResponse.errorTrace = "password is incorrect";
            delete internalResponse.response;
            return internalResponse;
        }
        internalResponse.response = { user: username };
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = "An internal error occurred";
    }
    return internalResponse;
}

export const getUser = async (username: string): Promise<InternalResponseInterface> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const user = new User(dynamoDBClient());
        internalResponse = await user.get(username);
        if (!internalResponse.error) {
            return internalResponse;
        }
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = "An internal error occurred";
    }
    return internalResponse;
}
