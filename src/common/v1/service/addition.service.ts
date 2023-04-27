import { InternalResponse } from "../interface/internal.response";

export const addition_service = (number_a: number, number_b: number): InternalResponse => {
    let response: InternalResponse;
    try {
        response.response = number_a + number_b;
    } catch (error) {
        response.error = true;
        response.errorTrace = error;
    }
    return response;
}