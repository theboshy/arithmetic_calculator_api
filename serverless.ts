import type { AWS } from '@serverless/typescript';

import { test, addition, subtraction, division, multiplication, squareRoot, stringGenerator } from '@functions/v1';
import { configDotEnv } from 'dotenv.config'

(async () => {
  await configDotEnv();
})()

const serverlessConfiguration: AWS = {
  useDotenv: true,
  service: 'aws-serverless-typescript-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: "arn:aws:dynamodb:us-west-2:*:table/arithmeticdb",
        }],
      },
    },
  },
  resources: {
    Resources: {
      User: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "User",
          AttributeDefinitions: [{
            AttributeName: "id",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "id",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      },
      Operation: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Operation",
          AttributeDefinitions: [{
            AttributeName: "id",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "id",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      },
      Record: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Record",
          AttributeDefinitions: [{
            AttributeName: "date",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "date",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      }
    }
  },
  // import the function via paths
  functions: { test, addition, subtraction, division, multiplication, squareRoot, stringGenerator },
  package: { individually: true },
  custom: {
    dynamodb:{
      start:{
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev"
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
