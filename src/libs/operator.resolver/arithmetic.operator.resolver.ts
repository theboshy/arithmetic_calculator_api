import createError from 'http-errors';

type ArithemeticOperationType = (a: number, b?: number) => number;

const arithmeticOperations: Record<string, ArithemeticOperationType> = {
  addition: (a, b) => a + b,
  subtraction: (a, b) => a - b, //is and arithmetic operation so it should oeprate engatives too? #Math.abs()
  multiplication: (a, b) => a * b,
  division: (a, b) => a / b,
  squareRoot:(a) => Math.sqrt(a)
};

export const arithmeticOperationResolver = (a: number, b: number, operation: string): number => {
  const selectedOperation = arithmeticOperations[operation];
  if (!selectedOperation) {
    throw new createError.BadRequest(JSON.stringify({error: `Arithmetic Operation Not Supported: ${operation}`}));
  }
  return selectedOperation(a, b);
}