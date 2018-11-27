// ./express-server/routes/notes.server.route.js
import express from 'express';
// import config from '../config.js';
//
import config from '../config';
// set the MONGO_URL
var mongo = require('then-mongo');

//mongodb://<dbuser>:<dbpassword>@ds235788.mlab.com:35788/leoquipwebsite
const mongoUrl = config.mongoUrl;
//const mongoUrl = process.env.MONGO_URL || 'mongodb://leoquip.com:123456@ds235788.mongolab.com:53320/leoquipwebsite';
var db = mongo(mongoUrl, config.collectionsList);

var bodyParser = require('body-parser')
//import controller file
//import * as commonController from '../controllers/common.server.controller';
var commonController = require('crud-controler-bg')
// get an instance of express router
const app = express();

app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data
commonController.setDbConnection(db);
//// common
// app.route('/common/search').post(commonController.getAllItems);
app.route('/common').post(commonController.getAllItems)
app.route('/common/add').post(commonController.addAnItem)
app.route('/common/delete')
      .post(commonController.removeAnItem)
// .get(notesController.getNotes);
app.route('/common/update')
      .post(commonController.updateAnItem)



export default app;
