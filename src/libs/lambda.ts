import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import httpErrorHandler from '@middy/http-error-handler'
import cors from '@middy/http-cors';

const corsOptions = {
  origins: [process.env.ALLOWED_ORIGINS],
  headers: process.env.ALLOWED_HEADERS,
  requestmethods: 'GET,POST,OPTIONS'
}



export const middyfy = (handler) => {
  const middyHandler = middy(handler).use(cors(corsOptions)).use(middyJsonBodyParser()).use(httpErrorHandler())
  return middyHandler;
}