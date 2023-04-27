export const additionSchema = {
    type: "object",
    properties: {
      number_a: { type: 'number' },
      number_b: { type: 'number' },
    },
    required: ['number_a', 'number_b'],
  } as const;
  