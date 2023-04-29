import { additionService } from './addition.service';
import { InternalResponse } from '../model/internal.response';

describe('additionService', () => {
  it('should add two numbers', () => {
    const numberA = 5;
    const numberB = 10;
    const expectedResult: InternalResponse = {
      error: false,
      response: 15,
    };
    const result = additionService(numberA, numberB);
    expect(result).toEqual(expectedResult);
    expect(result.response).toEqual(numberA + numberB);
  });

  it('should return an error message when given invalid inputs', () => {
    const numberA = 5;
    const numberB = 'not a number' as any;
    const expectedResult: InternalResponse = {
      error: true,
      errorTrace: "Not A Number",
    };
    const result = additionService(numberA, numberB);
    expect(result).toEqual(expectedResult);
  });
});
