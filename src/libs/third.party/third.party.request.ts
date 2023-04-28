import { InternalResponseInterface } from "src/common/v1/interface/internal.response";
import fetch from "node-fetch"

/**
 * Fetches data from a URL and returns the response.
 * @param url - The URL to fetch data from.
 * @param options - The options to pass to the fetch function (optional).
 * @returns The response as an InternalResponseInterface object.
 * @returns The response as the specified type ["json", "plain"]
 */
export const fetchUrl = async (url: string, options?: any, responseType: string = "plain"): Promise<InternalResponseInterface> => {
    const response: InternalResponseInterface = {
      error: false,
      errorTrace: null,
      response: null,
    };
  
    try {
      const fetchResponse = await fetch(url, options);
      let data;
      switch(responseType) {
        case "json": {
            data = await fetchResponse.json();
        }
        case "plain": { 
            data = await fetchResponse.text();
        }
      }
      response.response = data;
    } catch (error) {
      response.error = true;
      response.errorTrace = error.message;
    }
  
    return response;
  };
  