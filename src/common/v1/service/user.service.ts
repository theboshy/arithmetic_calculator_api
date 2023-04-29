import { dynamoDBClient } from "src/common/database/dynamo.db";
import { InternalResponseInterface } from "../interface/internal.response";
import { InternalResponse } from "../model/internal.response";
import { User } from "../model/user.model";
import { v4 } from "uuid";

export const userRegisterService = async (username: string, password: string): Promise<InternalResponseInterface> => { 
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const user = new User(dynamoDBClient());
        user.id = v4()
        user.status = true
        user.username = username;
        user.password = password;
        const {error, response} = await user.create();
        if (error) {
            internalResponse.error = true;
            internalResponse.errorTrace = response;
        }
        internalResponse.response = response;
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
    }
    return internalResponse;
}