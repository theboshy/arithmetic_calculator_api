import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import httpErrorHandler from '@middy/http-error-handler'

export const middyfy = (handler) => {
  const middyHandler = middy(handler)
  middyHandler.use(middyJsonBodyParser())
  middyHandler.use(httpErrorHandler())
  return middyHandler;
}