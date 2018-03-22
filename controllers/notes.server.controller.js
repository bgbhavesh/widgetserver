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

export const addNotes = (req,res) => {
    let note = req.body.obj;
    db.widgets.update({_id:note._id},note,{upsert:true},function(err,data){
        if(data){
            db.widgets.find({},function(err,data){
                return res.json(data);
            })
        }
        else return res.json({'success':false,'message':'Some Error'});
    });
}

export const updateNotes = (req,res) => {
    return res.json ({updateNotes:'updateNotes'})
}
export const removeNotes = (req,res) => {
    db.widgets.remove({_id:req.body.id},function(err,data){
        if(data){
            db.widgets.find({},function(err,data){
                return res.json(data);
            })
        }
        else return res.json({'success':false,'message':'Some Error'});
    });
} 

