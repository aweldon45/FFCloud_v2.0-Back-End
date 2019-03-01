//Deprecated
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
});

const docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing festival films into DynamoDB. Please wait.');

const allMovies = JSON.parse(fs.readFileSync('festivaldata.json', 'utf8'));
allMovies.forEach(function(film) {
  const params = {
    TableName: 'FestivalFilms',
    Item: {
      'title': film.title,
      'festival': film.festival,
      'info': film.info
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error('Unable to add film', film.title, '.Error JSON', JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded:", film.title);
    }
  }
);
});
