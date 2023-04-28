export const requestValidationSchema = {
    type: 'object',
    properties: {
        numberA: { type: 'string' },
        numberB: { type: 'string' },
    },
    required: ["numberA", "numberB"]
};

export const twoNumberValidator = {
    type: "object",
    properties: {
      numberA: {
        type: "number",
        minimum: 0,
      },
      numberB: {
        type: "number",
        minimum: 1,
      },
    },
    required: ["numberA", "numberB"],
  };