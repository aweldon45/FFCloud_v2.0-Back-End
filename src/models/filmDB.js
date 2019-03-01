//Deprecated
const AWS = require('aws-sdk')
const fs = require('fs');
const docClient = new AWS.DynamoDB.DocumentClient();

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
});

const TableName = 'FestivalFilms';
const KeySchema = [
  { AttributeName: 'title', KeyType: 'HASH'}, //Partition Key
  { AttributeName: 'festival', KeyType: 'RANGE'} //Sort Key
];
const AttributeDefinitions = [
  { AttributeName: 'title', AttributeType: 'S'},
  { AttributeName: 'festival', AttributeType: 'S'},
];
const ProvisionedThroughput = {
  ReadCapacityUnits: 10,
  WriteCapacityUnits: 10
};
const Item = {
  'title': this.title,
  'festival': this.festival,
  'info': this.info
}
