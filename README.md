# arithmetic_calculator_api

# Project Installation Guide
Clone the Project

```bash
  git clone <project_url>
  cd <project_name>
```
## Install Serverless Framework

```bash
  npm run install:serverless
```

## Install TypeScript
```bash
  npm run install:ts
```

## Install Project Dependencies
```bash
  npm install
```


# Configuration

## Create an AwsConfig.json file in the root directory with the following configuration:
> see [how to get your access keys](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html)

```json
{
  "accessKeyId": "<your_access_key_id>",
  "secretAccessKey": "<your_secret_access_key>",
  "region": "us-east-1"
}
```

## Modify the **.env.dev** file in the root folder of the project with your jwt secret and allowed origins and other configurations
```bash
  JWT_SECRET=<jwt_secret>
  ALLOWED_ORIGINS="<allowed_origin>"
  ALLOWED_HEADERS="x-access-token,Content-Type,Authorization"
  INITIAL_USER_BALANCE=200
  STRING_GENERATOR_API="https://www.random.org/strings/?num=1&len=10&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain"
```

## Install a local DynamoDB with:

```bash
  npm run install:dynamodb
```

# Running the Serverless App

## Execute the following command to start the app offline:

```bash
  npm run start:offline
```  

Wait until the console shows the endpoints and the database says it's up.

## Populate the database with arithmetic operations:

```bash
  npm run seed:operations
```
this going to create the operations that can be peformed in this way
```json
{
        "id": "2e630e6d-7500-4017-b5b8-2750b853992f",
        "type": "addition",
        "cost": 2
    },
    {
        "id": "cc44b18f-ccda-44d2-a8a8-7987272f480e",
        "type": "subtraction",
        "cost": 2
    },
```

> note that you can change the **operationId** for an unique string that you want like "addition_operation" for instance

# REMEMBER: this is the operationId that you should send when trying to perform an operation, it needs to be sended as a query_param in every operation
  with the name of **operationId**, so when your about to call an operation it should look like this
  
  ```bash
    curl -X GET http://localhost:3000/dev/v1/addition?numberA=45&numberB=1&operationId=<addition_operation_id>  -H "x-access-token: <your_jw_token>"
  ```
> it made this way to prevent extra configuration


## And is done you can start using the arithmetic_api locally 

# USE

to perform all operations, you must use the */regiter* and */login* endpoints 
> both are *POST* methods so the data is sending in the body

## use 
```bash
  /register
```
to create a new user with the following params
```bash
  {
    "username": "<your_username>",
    "password": "<your_password>"
  }
```

then you again you send this credentials to log_ing in the application using the [/login](https://www.postman.com/mononise-developers/workspace/arithmetic-api/request/1634830-279b3671-bdc7-4ead-a262-1fd36454f1c4) endpoint

this going to generate a token that you must use to perform all operation
```json
  {
    "status": 200,
    "response": "<jwt_token>"
}
```
> note: tokens by default are being created with a lifespan of 1 hour, after the token expired you will 
> need to generate a new one in order to continue using the API

this token have to be sended in the headers of the operation that you want to perform with this header name
```bash
  x-access-token: <jwt_token>
```

## TEST with POSTMAN

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1634830-5e29fd2d-ddd6-47fa-a3bd-b0070ee1e3e5?action=collection%2Ffork&collection-url=entityId%3D1634830-5e29fd2d-ddd6-47fa-a3bd-b0070ee1e3e5%26entityType%3Dcollection%26workspaceId%3D3efd7cc2-89ee-4495-94c3-44557799cbab)
