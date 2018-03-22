// ./express-server/controllers/notes.server.controller.js
//import models

//import Notes from '../models/notes.server.model';

import db from '../api/app'

export const getNotes = (req,res) => {
    db.widgets.find({},function(err,data){
        return res.json(data);
    });
    // console.log('getNotes')
//   return res.json ({getNotes:'getNotes'})
}

export const updateNotes = (req,res) => {
    let note = req.body;
    console.log('updateNotes ',note)
    db.widgets.update({_id:note._id},note,function(err,data){
        if(data){
            db.widgets.find({},function(err,data){
                return res.json(data);
            })
        }
        else return res.json({'success':false,'message':'Some Error'});
    });
}
export const addNotes = (req,res) => {
    console.log('addNotes')
    let note = req.body;
    db.widgets.insert(note,function(err,data){
        if(data){
            db.widgets.find({},function(err,data){
                return res.json(data);
            })
        }
        else return res.json({'success':false,'message':'Some Error'});
    });
}

export const removeNotes = (req,res) => {
    // console.log("removeNotes ",req.body)
    let id = req.body.id;
    // console.log("removeNotes ",id)
    db.widgets.remove({_id:id},function(err,data){
        if(data){
            db.widgets.find({},function(err,data){
                return res.json(data);
            })
        }
        else return res.json({'success':false,'message':'Some Error'});
    });
} 

