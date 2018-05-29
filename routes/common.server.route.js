// ./express-server/routes/notes.server.route.js
import express from 'express';

var bodyParser = require('body-parser')
//import controller file
import * as commonController from '../controllers/common.server.controller';

// get an instance of express router
const app = express();

app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data

//// common
app.route('/common/search').post(commonController.getAllItems);
app.route('/common').post(commonController.getAllItems)
app.route('/common/add').post(commonController.addAnItem)
app.route('/common/delete')
      .post(commonController.removeAnItem)
// .get(notesController.getNotes);
app.route('/common/update')
      .post(commonController.updateAnItem)



// .post(notesController.addNotes)


export default app;
