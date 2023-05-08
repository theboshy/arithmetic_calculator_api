export const requestValidationSchema = {
    type: 'object',
    properties: {
        numberA: { type: 'string' },
        numberB: { type: 'string' },
    },
    required: ["numberA", "numberB"]
};

export const requestValidationSchemaSquareRoot = {
  type: 'object',
  properties: {
      numberA: { type: 'string' },
  },
  required: ["numberA"]
};

export const validationSchemaSquareRoot = {
  type: 'object',
  properties: {
      numberA: { 
        type: 'number',
        minimum: 1
      },
  },
  required: ["numberA"]
};

export const twoNumberValidator = {
    type: "object",
    properties: {
      numberA: {
        type: "number",
      },
      numberB: {
        type: "number",
      },
    },
    required: ["numberA", "numberB"],
  };