import { InternalResponse } from "../model/internal.response";
import { squareRootService } from "./square.root.service";

describe("squareRootService", () => {
  it("should calculate the square root of a number", () => {
    // Arrange
    const number = 16;
    const expectedResponse: InternalResponse = {
      response: 4,
    };

    const response = squareRootService(number);
    expect(response).toEqual(expectedResponse);
  });

  it("should return an error if the input number is negative", () => {
    const number = -16;
    const expectedResponse: InternalResponse = {
      response: NaN,
    };
    const response = squareRootService(number);
    expect(response).toEqual(expectedResponse);
  });
});
