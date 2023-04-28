import { InternalResponse } from '../model/internal.response';
import { divisionService } from './division.service';

describe('divisionService', () => {
  it('should divide two numbers and return a valid InternalResponse', () => {
    const numberA = 10;
    const numberB = 2;

    const result = divisionService(numberA, numberB);

    expect(result).toBeInstanceOf(InternalResponse);
    expect(result.error).toBeFalsy();
    expect(result.response).toBe(5);
  });

  it('should return an error InternalResponse when dividing by zero', () => {
    const numberA = 10;
    const numberB = 0;

    const result = divisionService(numberA, numberB);
    expect(result).toBeInstanceOf(InternalResponse);
    expect(result.response).toBe(Infinity);
  });

  it('should return an error InternalResponse when passing invalid parameters', () => {
    const numberA = 10;
    const numberB = 'not a number';

    const result = divisionService(numberA, numberB as any);

    expect(result.response).toBe(NaN)
  });
});
