const express = require('express');
const cors = require('cors');
const mongodb = require('./db');

const port = process.env.PORT || 8080;
const app = express();

const swagger = require('swagger-ui-express');
const swaggerDocs = require('./swagger-output.json');

app
  .use(cors())
  .use('/api-docs', swagger.serve, swagger.setup(swaggerDocs))
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});