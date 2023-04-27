export const additionSchema = {
    type: 'object',
    properties: {
        numberA: { type: 'string' },
        numberB: { type: 'string' },
    },
    require: ["numberA", "numberB"]
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