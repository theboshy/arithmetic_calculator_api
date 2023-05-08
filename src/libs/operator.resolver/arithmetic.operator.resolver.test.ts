import { arithmeticOperationResolver } from "./arithmetic.operator.resolver";

describe("arithmeticOperationResolver", () => {
  it("should add two numbers correctly", () => {
    const result = arithmeticOperationResolver(5, 3, "addition");
    expect(result).toEqual({ error: false, response: 8 });
  });

  it("should subtract two numbers correctly", () => {
    const result = arithmeticOperationResolver(5, 3, "subtraction");
    expect(result).toEqual({ error: false, response: 2 });
  });

  it("should multiply two numbers correctly", () => {
    const result = arithmeticOperationResolver(5, 3, "multiplication");
    expect(result).toEqual({ error: false, response: 15 });
  });

  it("should divide two numbers correctly", () => {
    const result = arithmeticOperationResolver(15, 3, "division");
    expect(result).toEqual({ error: false, response: 5 });
  });

  it("should calculate the square root of a number correctly", () => {
    
    const result = arithmeticOperationResolver(25, undefined, "squareRoot");
    expect(result).toEqual({ error: false, response: 5 });
  });

  it("should return an error if operation is not supported", () => {
    const result = arithmeticOperationResolver(5, 3, "exponentiation");
    expect(result).toEqual({
      error: true,
      errorTrace: "Arithmetic Operation Not Supported: exponentiation",
    });
  });

  it("should return an Infinity if the operation divide by 0", () => {
    const result = arithmeticOperationResolver(5, 0, "division");
    expect(result).toEqual({ error: false, response: Infinity}); // avalidation to prevent divide by zero is in the middleware
  });
});
