import { InternalResponse } from "../model/internal.response";
import { arithmeticOperationResolver } from "../../../libs/operator.resolver/arithmetic.operator.resolver";

export const squareRootService = (numberA: number): InternalResponse => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        internalResponse.response = internalResponse.response = arithmeticOperationResolver(numberA, null, "squareRoot");
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
    }
    return internalResponse;
}