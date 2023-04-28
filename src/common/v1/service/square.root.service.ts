import { InternalResponse } from "../model/internal.response";
import { arithmeticOperationResolver } from "../../../libs/operator.resolver/arithmetic.operator.resolver";

export const squareRootService = (numberA: number, numberB: number): InternalResponse => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        internalResponse.response = internalResponse.response = arithmeticOperationResolver(numberA, numberB, "squareRoot");
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
    }
    return internalResponse;
}