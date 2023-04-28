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
      },
      numberB: {
        type: "number",
      },
    },
    required: ["numberA", "numberB"],
  };