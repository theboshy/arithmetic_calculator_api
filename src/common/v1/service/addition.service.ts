import { InternalResponse } from "../model/internal.response";
import { arithmeticOperationResolver } from "../../../libs/operator.resolver/arithmetic.operator.resolver";

export const additionService = (numberA: number, numberB: number): InternalResponse => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        internalResponse = arithmeticOperationResolver(numberA, numberB, "addition");
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = "An internal error occurred";
    }
    return internalResponse;
}