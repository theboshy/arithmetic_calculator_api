module.exports = {
    tables: [
        {
            TableName: "Users",
            KeySchema: [{
                AttributeName: "username",
                KeyType: "HASH"
            }],
            AttributeDefinitions: [{
                AttributeName: "username",
                AttributeType: "S",
            }],
            BillingMode: "PAY_PER_REQUEST",
        },
        {
            TableName: "Operation",
            KeySchema: [{
                AttributeName: "id",
                KeyType: "HASH"
            }],
            AttributeDefinitions: [{
                AttributeName: "id",
                AttributeType: "S",
            }],
            BillingMode: "PAY_PER_REQUEST",
        },
        {
            TableName: "UserRecord",
            KeySchema: [{
                AttributeName: "id",
                KeyType: "HASH"
            }],
            AttributeDefinitions: [{
                AttributeName: "id",
                AttributeType: "S",
            }],
            BillingMode: "PAY_PER_REQUEST",
        }
    ]
}