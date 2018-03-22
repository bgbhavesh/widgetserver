const express = require('express')
import path from 'path';
import SourceMapSupport from 'source-map-support';
// import routes
import apiRoutes from '../routes/notes.server.route';
// express
const app = express()

// set the MONGO_URL
var mongo = require('then-mongo');

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test1';
var db = mongo(mongoUrl, ["widgets"]);
export default db ;
// add Source Map Support
SourceMapSupport.install();
// set the port
const port = process.env.PORT || 3001;




// 
app.use('/api', apiRoutes);

app.get('/', (req,res) => {
    return res.end('Api working');
});

//   // catch 404
// app.use((req, res, next) => {
//     res.status(404).send('<h2 align=center>Page Not Found!</h2>');
//   });
  
// // start the server
app.listen(port,() => {
    console.log(`App Server Listening at ${port}`);
  });  