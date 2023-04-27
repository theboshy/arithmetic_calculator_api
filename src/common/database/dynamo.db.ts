import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const dynamoDBClient = (): DocumentClient => {
  if (process.env.IS_OFFLINE) {
    console.info("dynamodatabase client conected in offline mode")
    return new AWS.DynamoDB.DocumentClient({
      region: process.env.HOSTNAME,
      endpoint: process.env.DYNAMO_DB_HOSTNAME,
    });
  }
  return new AWS.DynamoDB.DocumentClient();
};