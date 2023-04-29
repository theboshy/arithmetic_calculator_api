import { InternalResponse } from "../model/internal.response";
import { subtractionService } from "./subtraction.service";

describe("subtractionService", () => {
  it("should subtract two numbers correctly", () => {
    const numberA = 7;
    const numberB = 3;
    const expectedResult: InternalResponse = {
      error: false,
      response: 4,
    };

    const result = subtractionService(numberA, numberB);
    expect(result).toEqual(expectedResult);
  });

  it("should handle errors correctly", () => {
    const numberA = "invalid";
    const numberB = 2;
    const expectedResult: InternalResponse = {
      error: true,
      errorTrace: "Not A Number",
    };

    const result = subtractionService(numberA as any, numberB);
    expect(result).toEqual(expectedResult);
  });
});
