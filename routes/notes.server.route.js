// ./express-server/routes/notes.server.route.js
import express from 'express';

var bodyParser = require('body-parser')
//import controller file
import * as notesController from '../controllers/notes.server.controller';

// get an instance of express router
const app = express();

app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data
//// widgets
app.route('/widgets/searchWidget').post(notesController.getNotes);
app.route('/widgets').get(notesController.getNotes)
      .post(notesController.addNotes)
app.route('/widgets/deleteWidget')
      .post(notesController.removeNotes)
// .get(notesController.getNotes);
app.route('/widgets/updateWidget')
      .post(notesController.updateNotes)
// .get(notesController.getNotes);
//// widgets
//// ShowCaseSlider
// app.route('/showCaseSlider').get(notesController.getSlides)
//// ShowCaseSlider


export default app;
