import { stringGeneratorService } from "./string.generator.service";
import { InternalResponseInterface } from "../interface/internal.response";

describe("stringGeneratorService", () => {

    it("should return InternalResponseInterface object with response when successful", async () => {
        const TEST_URL = "https://www.random.org/strings/?num=1&len=10&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain";
        const actualResult: InternalResponseInterface = await stringGeneratorService(TEST_URL);
        expect(actualResult.response).toBeTruthy();
        expect(actualResult.error).toBeFalsy();
    });
});
