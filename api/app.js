const express = require('express')
import path from 'path';
import SourceMapSupport from 'source-map-support';
// import routes
import apiRoutes from '../routes/common.server.route';
// set the MONGO_URL
var mongo = require('then-mongo');

//mongodb://<dbuser>:<dbpassword>@ds235788.mlab.com:35788/leoquipwebsite
const mongoUrl = process.env.MONGO_URL || 'mongodb://leoquip.com:123456@ds053320.mongolab.com:53320/leoquip';
//const mongoUrl = process.env.MONGO_URL || 'mongodb://leoquip.com:123456@ds235788.mongolab.com:53320/leoquipwebsite';
var db = mongo(mongoUrl, ["widgets","products"]);
export default db;

const port = process.env.PORT || 3001;

// express
const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


// set the port

app.use('/api', apiRoutes);

// // start the server
app.listen(port, () => {
  console.log(`App Server Listening at ${port}`);
});  
