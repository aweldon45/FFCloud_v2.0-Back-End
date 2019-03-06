const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const AWS = require('aws-sdk')

const app = express()

// DynamoDB API
AWS.config.update({
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

//middleware morgan & bodyparser & cors
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes/filmrouter')(app)

const port = 8081
app.listen(port, () => console.log('Server started on port 8081...'))
