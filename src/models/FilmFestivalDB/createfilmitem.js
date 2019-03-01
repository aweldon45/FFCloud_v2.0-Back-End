//Deprecated
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = 'FestivalFilms';

const title = "Aubrey's Film";
const festival = 'Encore Film Festival';

const params = {
  TableName: table,
  Item: {
    'title': title,
    'festival': festival,
    'info': {
      'screening date': 'Nov 4, 2018',
      'screening time': '3:30 PM',
      'directors': ['Aubrey Chamberlain, Tony Weldon'],
      'logline': 'A trip to Montreal',
      'genre': 'Romnace',
      'image_url': 'N/A',
      'screening_url': 'N/A'
    }
  }
};

console.log('Adding a new item...');
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
