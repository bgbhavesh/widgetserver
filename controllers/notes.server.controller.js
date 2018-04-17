// ./express-server/controllers/notes.server.controller.js
//import models

//import Notes from '../models/notes.server.model';
var randomstring = require("randomstring");
import db from '../api/app';
var ObjectId = require('mongodb').ObjectID;
export const getNotes = (req,res) => {
    console.log(req.body);
    if(req && req.body && req.body.searchText){
         db.widgets.find({ $or:[{name:req.body.searchText},{description:req.body.searchText}] },function(err,data){
            return res.json(data);
        });
    }
    else{
        db.widgets.find({},function(err,data){
            return res.json(data);
        });
    }
    
    // console.log('getNotes')
//   return res.json ({getNotes:'getNotes'})
}

export const updateNotes = (req,res) => {
    let note = req.body;
    console.log('updateNotes ',note)
    console.log(req.body);
    db.widgets.update({uid:note.uid},note,function(err,data){
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
    note.uid = randomstring.generate();
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
    let uid = req.body.uid;
    console.log("removeNotes ",uid)
    db.widgets.remove({uid:uid},function(err,data){
        console.log('err=',err);
        console.log('data=',data);
        if(data){
            db.widgets.find({},function(err,data){
                return res.json(data);
            })
        }
        else return res.json({'success':false,'message':'Some Error'});
    });
} 

