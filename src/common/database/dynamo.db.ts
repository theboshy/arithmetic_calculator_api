import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const dynamoDBClient = (): DocumentClient => {
  if (process.env.IS_OFFLINE) {
    AWS.config.update({
      region: 'us-east-1',
    });
    return new AWS.DynamoDB.DocumentClient({
      //region: "local",
      endpoint: "http://localhost:5000",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // needed if you don't have aws credentials at all in env
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
  }
  return new AWS.DynamoDB.DocumentClient();
};