import { arithmeticOperationResolver } from "./arithmetic.operator.resolver";
import createError from 'http-errors';

describe('arithmeticOperationResolver_function', () => {

    // Tests that the function returns the correct result for valid input values for addition operation. 
    it("test_valid_input_values_addition", () => {
        expect(arithmeticOperationResolver(2, 3, "addition")).toBe(5);
    });

    // Tests that the function returns the correct result for valid input values for subtraction operation. 
    it("test_valid_input_values_subtraction", () => {
        expect(arithmeticOperationResolver(5, 3, "subtraction")).toBe(2);
    });

    // Tests that the function throws BadRequest error with appropriate message for unsupported arithmetic operation. 
    it("test_unsupported_arithmetic_operation", () => {
        expect(() => arithmeticOperationResolver(2, 3, "exponentiation")).toThrowError(createError.BadRequest);
    });

    // Tests that the function returns the correct result for valid input values for multiplication operation. 
    it("test_valid_input_values_multiplication", () => {
        expect(arithmeticOperationResolver(2, 3, "multiplication")).toBe(6);
    });

    // Tests that the function returns the correct result for valid input values for division operation. 
    it("test_valid_input_values_division", () => {
        expect(arithmeticOperationResolver(6, 3, "division")).toBe(2);
    });

    // Tests that the function returns the correct result for valid input values for squareRoot operation. 
    it("test_valid_input_values_square_root", () => {
        expect(arithmeticOperationResolver(16, null, "squareRoot")).toBe(4);
    });
});