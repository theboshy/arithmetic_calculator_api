import { handlerPath } from '@libs/handler-resolver';
import schema from '../../common/v1/schemas/schema';
import { parseStringToArray } from '@libs/strings/strings.utils';
import { configDotEnv } from '@libs/env.resolver/env.config';

(() => {
  configDotEnv()
})()

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
        }
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
        cors: {
          origins: [process.env.ALLOWED_ORIGINS],
          headers: parseStringToArray(process.env.ALLOWED_HEADERS)
        }
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
        cors: {
          origins: [process.env.ALLOWED_ORIGINS],
          headers: parseStringToArray(process.env.ALLOWED_HEADERS)
        }
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
        cors: {
          origins: [process.env.ALLOWED_ORIGINS],
          headers: parseStringToArray(process.env.ALLOWED_HEADERS)
        }
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
        cors: {
          origins: [process.env.ALLOWED_ORIGINS],
          headers: parseStringToArray(process.env.ALLOWED_HEADERS)
        }
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
        cors: {
          origins: [process.env.ALLOWED_ORIGINS],
          headers: parseStringToArray(process.env.ALLOWED_HEADERS)
        }
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
        cors: {
          origins: [process.env.ALLOWED_ORIGINS],
          headers: parseStringToArray(process.env.ALLOWED_HEADERS)
        }
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
        cors: {
          origins: [process.env.ALLOWED_ORIGINS],
        }
      },
    },
  ],
};

export const operationGetAllHandler = {
  handler: `${handlerPath(__dirname)}/operation.all/handler.operationGetAllHandler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'v1/operation',
        cors: {
          origins: [process.env.ALLOWED_ORIGINS],
          headers: parseStringToArray(process.env.ALLOWED_HEADERS)
        }
      },
    },
  ],
};


export const userRecordGetAllHandler = {
  handler: `${handlerPath(__dirname)}/user.record.all/handler.userRecordGetAllHandler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'v1/userRecord',
        cors: {
          origins: [process.env.ALLOWED_ORIGINS],
          headers: parseStringToArray(process.env.ALLOWED_HEADERS)
        }
      },
    },
  ],
};


export const userRecordDeleteHandler = {
  handler: `${handlerPath(__dirname)}/user.record.delete/handler.userRecordDeleteHandler`,
  events: [
    {
      http: {
        method: 'put',
        path: 'v1/userRecord',
        cors: {
          origins: [process.env.ALLOWED_ORIGINS],
          headers: parseStringToArray(process.env.ALLOWED_HEADERS)
        }
      },
    },
  ],
};


(() => {
  console.log([process.env.ALLOWED_ORIGINS])
})()
