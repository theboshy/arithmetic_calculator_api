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
```json
{
  "accessKeyId": "<your_access_key_id>",
  "secretAccessKey": "<your_secret_access_key>",
  "region": "us-east-1"
}
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

# And is done you can start using the arithmetic_api locally 

## TEST with POSTMAN

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1634830-5e29fd2d-ddd6-47fa-a3bd-b0070ee1e3e5?action=collection%2Ffork&collection-url=entityId%3D1634830-5e29fd2d-ddd6-47fa-a3bd-b0070ee1e3e5%26entityType%3Dcollection%26workspaceId%3D3efd7cc2-89ee-4495-94c3-44557799cbab)
