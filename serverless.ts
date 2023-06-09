import type { AWS } from '@serverless/typescript';
import {
  test, addition, subtraction, division, multiplication, squareRoot, stringGenerator, userRegisterHandler,
  userLoginHandler, operationGetAllHandler, userRecordGetAllHandler, userRecordDeleteHandler
} from '@functions/v1';
import { parseStringToArray } from '@libs/strings/strings.utils';
import { configDotEnv } from "./src/libs/env.resolver/env.config"


(() => {
  configDotEnv()
})()

const serverlessConfiguration: AWS = {
  useDotenv: true,
  service: 'aws-serverless-typescript-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    httpApi: {
      cors: {
        allowedOrigins: [process.env.ALLOWED_ORIGINS],
        allowedHeaders: parseStringToArray(process.env.ALLOWED_HEADERS)
      },
    },
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
        statements: [
          {
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
            Resource: "arn:aws:dynamodb:us-east-1:*:table/Users",
          },
          {
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
            Resource: "arn:aws:dynamodb:us-east-1:*:table/UserRecord",
          },
          {
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
            Resource: "arn:aws:dynamodb:us-east-1:*:table/Operation",
          }
        ],
      },
    },
  },
  resources: {
    Resources: {
      Users: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Users",
          AttributeDefinitions: [{
            AttributeName: "username",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "username",
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
      UserRecord: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "UserRecord",
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
      }
    }
  },
  // import the function via paths
  functions: {
    test, addition, subtraction, division, multiplication,
    squareRoot, stringGenerator, userRegisterHandler, userLoginHandler,
    operationGetAllHandler, userRecordGetAllHandler, userRecordDeleteHandler
  },
  package: { individually: true },
  custom: {
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: ["production", "dev"]
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

(() => {
  console.log([process.env.ALLOWED_ORIGINS])
})()
