import { InternalResponse } from "../model/internal.response";
import { arithmeticOperationResolver } from "../../../libs/operator.resolver/arithmetic.operator.resolver";

export const squareRootService = (numberA: number): InternalResponse => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        const {error, response} = arithmeticOperationResolver(numberA, null, "squareRoot");
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