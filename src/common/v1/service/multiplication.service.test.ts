import { multiplicationService } from './multiplication.service';
import { InternalResponse } from '../model/internal.response';

describe('multiplicationService', () => {
  it('should return the correct result when multiplying two positive numbers', () => {
    const numberA = 2;
    const numberB = 3;
    const expectedResponse: InternalResponse = {
      error: false,
      response: 6,
    };

    const actualResponse = multiplicationService(numberA, numberB);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it('should return the correct result when multiplying a positive and a negative number', () => {
    const numberA = -4;
    const numberB = 2;
    const expectedResponse: InternalResponse = {
      error: false,
      response: -8,
    };

    const actualResponse = multiplicationService(numberA, numberB);

    expect(actualResponse).toEqual(expectedResponse);
  });

  it('should return 0 response when multiplying by zero', () => {
    const numberA = 10;
    const numberB = 0;
    const expectedResponse: InternalResponse = {
      error: false,
      response: 0,
    };

    const actualResponse = multiplicationService(numberA, numberB);

    expect(actualResponse).toEqual(expectedResponse);
  });
});
