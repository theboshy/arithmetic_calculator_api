import { fetchUrl } from "../../../libs/third.party/third.party.request";
import { InternalResponse } from "../model/internal.response";

export const stringGeneratorService = async (url: string = process.env.STRING_GENERATOR_API): Promise<InternalResponse> => {
    let internalResponse: InternalResponse = new InternalResponse;
    try {
        internalResponse = await fetchUrl(url);
    } catch (error) {
        internalResponse.error = true;
        internalResponse.errorTrace = "An internal error occurred";
    }
    return internalResponse;
}