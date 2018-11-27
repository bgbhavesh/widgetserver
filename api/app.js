const express = require('express')
// import path from 'path';
// import SourceMapSupport from 'source-map-support';
// import routes
import apiRoutes from '../routes/common.server.route';


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
