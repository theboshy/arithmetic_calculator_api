import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const dynamoDBClient = (): DocumentClient => {
  if (process.env.JEST_WORKER_ID) { //conect to jest database for tests
    return new AWS.DynamoDB.DocumentClient({
      endpoint: "http://localhost:8000",
      region: "local-env",
      sslEnabled: false
    });
  }
  if (process.env.IS_OFFLINE) { //conect to local database to developtment
    AWS.config.update({
      region: 'us-east-1',
    });
    AWS.config.loadFromPath('./AwsConfig.json');
    return new AWS.DynamoDB.DocumentClient({
      endpoint: "http://localhost:5000",
    });
  }
  return new AWS.DynamoDB.DocumentClient(); //coenct to production database
};