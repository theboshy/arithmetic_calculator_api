import { fetchUrl } from "@libs/third.party/third.party.request";
import { InternalResponse } from "../model/internal.response";

export const stringGeneratorService = async (): Promise<InternalResponse> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        internalResponse = await fetchUrl(process.env.STRING_GENERATOR_API);
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = error;
    }
    return internalResponse;
}