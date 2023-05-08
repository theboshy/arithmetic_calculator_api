import { MATCH_NUMBERS } from "./regex.validator";

describe("Regex Test", () => {
  
    test("positive integer should match", () => {
      expect(MATCH_NUMBERS.test("123")).toBe(true);
    });
  
    test("negative integer should match", () => {
      expect(MATCH_NUMBERS.test("-123")).toBe(true);
    });
  
    test("positive float should match", () => {
      expect(MATCH_NUMBERS.test("123.45")).toBe(true);
    });
  
    test("negative float should match", () => {
      expect(MATCH_NUMBERS.test("-123.45")).toBe(true);
    });
  
    test("positive decimal should match", () => {
      expect(MATCH_NUMBERS.test("0.45")).toBe(true);
    });
  
    test("negative decimal should match", () => {
      expect(MATCH_NUMBERS.test("-0.45")).toBe(true);
    });
  
    test("empty string should not match", () => {
      expect(MATCH_NUMBERS.test("")).toBe(false);
    });
  
    test("non-numeric string should not match", () => {
      expect(MATCH_NUMBERS.test("abc")).toBe(false);
    });
  
    test("string with two decimal points should not match", () => {
      expect(MATCH_NUMBERS.test("123.4.5")).toBe(false);
    });
  
    test("string with dash in the middle should not match", () => {
      expect(MATCH_NUMBERS.test("1-1")).toBe(false);
    });
  });
  