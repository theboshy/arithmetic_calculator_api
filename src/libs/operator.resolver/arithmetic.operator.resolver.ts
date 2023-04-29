import { InternalResponseInterface } from "src/common/v1/interface/internal.response";

type ArithemeticOperationType = (a: number, b?: number) => number;

const arithmeticOperations: Record<string, ArithemeticOperationType> = {
  addition: (a, b) => a + b,
  subtraction: (a, b) => a - b,
  multiplication: (a, b) => a * b,
  division: (a, b) => a / b,
  squareRoot: (a) => Math.sqrt(a),
};

export const arithmeticOperationResolver = (
  a: number,
  b?: number,
  operation?: string
): InternalResponseInterface => {
  try {
    const selectedOperation = arithmeticOperations[operation];
    if (!selectedOperation) {
     return { error: true, response: `Arithmetic Operation Not Supported: ${operation}` }; //todo: change response for trace error and refactor services too
    }
    const result = selectedOperation(a, b);
    return { error: false, response: result };
  } catch (error) {
    return { error: true, errorTrace: error.message, response: undefined };
  }
};
