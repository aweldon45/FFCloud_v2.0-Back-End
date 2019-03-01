const AWS = require('aws-sdk');
const config = require('../config/config.js');

module.exports = (app) => {
  //get allfilms
  app.get('/allfilms', function (req, res) {
  AWS.config.update(config.aws_config)

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
      TableName: config.aws_table_name
    };

    docClient.scan(params, function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          res.send(data)
          console.log('Query succeeded.');
          data.Items.forEach(function(item) {
            console.log(` -${item.title}: ${item.festival}`);
          })};
        }
      );
    }); //end of get allfilms

//get a single film by name
    app.get( '/film', function (req, res) {
      AWS.config.update(config.aws_config)

      const docClient = new AWS.DynamoDB.DocumentClient();

      let queryFilm = decodeURIComponent(decodeURIComponent(req.url.slice(12)));
      console.log(req.url)
      console.log(queryFilm)

     const params = {
        TableName: 'FestivalFilms',
        KeyConditionExpression: '#ttl = :ttl',
        ExpressionAttributeNames: {
          "#ttl": 'title'
        },
        ExpressionAttributeValues: {
          ":ttl": queryFilm
        }
      };

      docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send(data)
            console.log('Query succeeded.');
            data.Items.forEach(function(item) {
              console.log(` -${item.title}: ${item.festival}`);
            });
        }
      });
    }
  ); //end of get a single film by name

  //add a film
  app.post('/newfilm', function (req, res) {
    AWS.config.update(config.aws_config)

    const {title, festival, info} = req.body;

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
     TableName: config.aws_table_name,
     Item: {
       'title': title,
       'festival': festival,
       'info': info
     }
   };

   console.log('Adding a new item...');
   docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
           res.send("Unable to add item. Error JSON:")
       } else {
           console.log("Added item:", JSON.stringify(data, null, 2));
           res.send(`Sucessfully added ${req.body.title}`)
       }
   });
 }); // End of addfilm

 //update a film
   app.post('/updatefilm', function (req, res) {
     AWS.config.update(config.aws_config)

     const {title, festival, updateValue, category} = req.body;

     const docClient = new AWS.DynamoDB.DocumentClient();

     const params = {
      TableName: config.aws_table_name,
      Key: {
        'title': title,
        'festival': festival
      },
      UpdateExpression: `set info.${category} = :c`,
      ExpressionAttributeValues: {
        ':c': updateValue
      },
      ReturnValues: 'UPDATED_NEW'
    };

    console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        res.send("Error. Item not updated");
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        res.send("Item succesfully updated");
      }
    });
  }); //End of update film

 //delete a film
   app.post('/deletefilm', function (req, res) {
     AWS.config.update(config.aws_config)

     const {title, festival} = req.body;

     const docClient = new AWS.DynamoDB.DocumentClient();

     const params = {
      TableName: config.aws_table_name,
      Key: {
        'title': title,
        'festival': festival
      }
    };

    console.log("Attempting a delete...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        res.send("Unable to delete item.");
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        res.send("DeleteItem succeeded:");
    }
  });
}); //End of delete item
};
