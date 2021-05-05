const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const AWS = require('aws-sdk');

const routes = require('./routes');

require('dotenv').config()

// eslint-disable-next-line no-undef
const { SECRET_ID, SECRET_KEY } = process.env;

AWS.config.update({
    accessKeyId: SECRET_ID, 
    secretAccessKey: SECRET_KEY, 
    region:'us-west-1' });    

app.use(bodyParser.json());
app.use(fileUpload());

app.use(routes);

module.exports = app;
