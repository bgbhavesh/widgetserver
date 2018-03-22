// ./express-server/routes/notes.server.route.js
import express from 'express';

//import controller file
import * as notesController from '../controllers/notes.server.controller';

// get an instance of express router
const router = express.Router();

router.route('/')
     .get(notesController.getNotes)
//      .post(notesController.addNotes)
     //.put(notesController.updateTodo);

router.route('/:id')
      .get(notesController.getNotes)
      .delete(notesController.removeNotes);


export default router;
