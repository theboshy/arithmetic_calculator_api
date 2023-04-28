import { InternalResponse } from "../model/internal.response";
import { arithmeticOperationResolver } from "../../../libs/operator.resolver/arithmetic.operator.resolver";

export const additionService = (numberA: number, numberB: number): InternalResponse => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const {error, response} = arithmeticOperationResolver(numberA, numberB, "addition");
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