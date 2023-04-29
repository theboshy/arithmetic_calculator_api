import { handlerPath } from '@libs/handler-resolver';
import schema from '../../common/v1/schemas/schema';
import { requestValidationSchema } from 'src/common/v1/schemas/arithmetic.operation.schema';

export const test = {
  handler: `${handlerPath(__dirname)}/test/handler.testHandler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'v1/test',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};


export const addition = {
  handler: `${handlerPath(__dirname)}/addition/handler.additionHandler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'v1/addition',
        request: {
          schemas: {
            'application/json': requestValidationSchema,
          },
        },
      },
    },
  ],
};

export const subtraction = {
  handler: `${handlerPath(__dirname)}/subtraction/handler.subtractionHandler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'v1/subtraction',
        request: {
          schemas: {
            'application/json': requestValidationSchema,
          },
        },
      },
    },
  ],
};

export const multiplication = {
  handler: `${handlerPath(__dirname)}/multiplication/handler.multiplicationHandler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'v1/multiplication',
        request: {
          schemas: {
            'application/json': requestValidationSchema,
          },
        },
      },
    },
  ],
};

export const division = {
  handler: `${handlerPath(__dirname)}/division/handler.divisionHandler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'v1/division',
        request: {
          schemas: {
            'application/json': requestValidationSchema,
          },
        },
      },
    },
  ],
};


export const squareRoot = {
  handler: `${handlerPath(__dirname)}/squareRoot/handler.squareRootHandler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'v1/squareRoot',
        request: {
          schemas: {
            'application/json': requestValidationSchema,
          },
        },
      },
    },
  ],
};

export const stringGenerator = {
  handler: `${handlerPath(__dirname)}/string.generator/handler.stringGeneratorHandler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'v1/stringGenerator',
      },
    },
  ],
};


export const userRegisterHandler = {
  handler: `${handlerPath(__dirname)}/user.register/handler.userRegisterHandler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'v1/register',
      },
    },
  ],
};


export const userLoginHandler = {
  handler: `${handlerPath(__dirname)}/user.login/handler.userLoginHandler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'v1/login',
      },
    },
  ],
};
