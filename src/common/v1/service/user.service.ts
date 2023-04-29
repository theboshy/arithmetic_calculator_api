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
        user.password = password;
        internalResponse = await user.create();
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
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
            return internalResponse;
        }
        internalResponse.response = true;
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
    }
    return internalResponse;
}