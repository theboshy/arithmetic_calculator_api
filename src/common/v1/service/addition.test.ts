import { additionService } from './addition.service';
import { InternalResponse } from '../model/internal.response';

describe('additionService', () => {
  it('should add two numbers', () => {
    const numberA = 5;
    const numberB = 10;
    const result = additionService(numberA, numberB);
    expect(result).toBeInstanceOf(InternalResponse);
    expect(result.response).toEqual(numberA + numberB);
  });

  it('should return an error message when given invalid inputs', () => {
    const numberA = 5;
    const numberB = 'not a number' as any;
    const result = additionService(numberA, numberB);
    expect(result).toBeInstanceOf(InternalResponse);
    expect(result.response).toContain("not a number");
  });
});
