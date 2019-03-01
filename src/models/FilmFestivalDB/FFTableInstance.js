//Deprecated
// DynamoDB config
AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'FestivalFilms',
  KeySchema: [
    { AttributeName: 'title', KeyType: 'HASH'}, //Partition Key
    { AttributeName: 'festival', KeyType: 'RANGE'} //Sort Key
  ],
  AttributeDefinitions: [
    { AttributeName: 'title', AttributeType: 'S'},
    { AttributeName: 'festival', AttributeType: 'S'},
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.error('Unable to crate table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
}
);
