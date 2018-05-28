// ./express-server/controllers/notes.server.controller.js
//import models

//import Notes from '../models/notes.server.model';
var randomstring = require("randomstring");
import db from '../api/app';
var ObjectId = require('mongodb').ObjectID;
export const getAllItems = (req, res) => {
    let reqJson = req.body;
        console.log("req.params", req.params);
    if (req && reqJson && reqJson.searchText && reqJson.searchText != '') {
        let reqModel = reqJson.model || 'widgets'
        db[reqModel].find({ $or: [{ name: reqJson.searchText }, { description: reqJson.searchText }] }, function (err, data) {
            return res.json(data);
        });
    }
    else {
        let reqModel = reqJson.model || 'widgets'
        db[reqModel].find({}, function (err, data) {
            return res.json(data);
        });
    }
    // if (req && reqJson) {
    //     console.log(reqJson);
    //     let reqModel = reqJson.model || 'widgets'
    //     db[reqModel].find({}, function (err, data) {
    //         return res.json(data);
    //     });
    // }

}
export const updateAnItem = (req, res) => {
    let reqJson = req.body;
    if (!reqJson || !reqJson.model) {
        return res.json({ 'success': false, 'message': 'Model Error' });
    }
    console.log('reqJson ', reqJson)
    db.widgets.update({ uid: reqJson.uid }, reqJson, function (err, data) {
        if (data) {
            let reqModel = reqJson.model || 'widgets'
            db[reqModel].find({}, function (err, data) {
                return res.json(data);
            })
        }
        else return res.json({ 'success': false, 'message': 'Some Error' });
    });
}
export const addAnItem = (req, res) => {
    let reqJson = req.body;
    if (!reqJson || !reqJson.model) {
        return res.json({ 'success': false, 'message': 'Model Error' });
    }
    reqJson.uid = randomstring.generate();
    let reqModel = reqJson.model || 'widgets'
    db[reqModel].insert(reqJson, function (err, data) {
        if (data) {
            db[reqModel].find({}, function (err, data) {
                return res.json(data);
            })
        }
        else return res.json({ 'success': false, 'message': 'Some Error' });
    });
}

export const removeAnItem = (req, res) => {
    let uid = req.body.uid;
    let reqJson = req.body;
    if (!reqJson || !reqJson.model) {
        return res.json({ 'success': false, 'message': 'Model Error' });
    }
    let reqModel = reqJson.model || 'widgets'
    db[reqModel].remove({ uid: uid }, function (err, data) {
        console.log('err=', err);
        console.log('data=', data);
        if (data) {
            db[reqModel].find({}, function (err, data) {
                return res.json(data);
            })
        }
        else return res.json({ 'success': false, 'message': 'Some Error' });
    });
}
