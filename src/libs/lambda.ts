import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import httpErrorHandler from '@middy/http-error-handler'
import cors from '@middy/http-cors';

const corsOptions = {
  origins: JSON.parse(process.env.ALLOWED_ORIGINS)
}

export const middyfy = (handler) => {
  const middyHandler = middy(handler).use(middyJsonBodyParser()).use(httpErrorHandler()).use(cors(corsOptions))
  return middyHandler;
}