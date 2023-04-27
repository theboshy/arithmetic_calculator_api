import Ajv from "ajv";
import { twoNumberValidator } from "src/common/v1/schemas/arithmetic.operation.schema";



const ajv = new Ajv();
export const validateTwoNumberOperation = ajv.compile(twoNumberValidator);