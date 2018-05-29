// ./express-server/controllers/notes.server.controller.js
//import models

//import Notes from '../models/notes.server.model';
var randomstring = require("randomstring");
import db from '../api/app';
var ObjectId = require('mongodb').ObjectID;
export const getAllItems = (req, res) => {
    let reqData = req.body;
    // console.log("reqData", reqData);
    if (req && reqData && reqData.searchText && reqData.searchText != '') {
        let reqModel = reqData.model || 'widgets'
        // console.log("reqData", reqData);
        db[reqModel].find({ $or: [{ name: reqData.searchText }, { description: reqData.searchText }] }, function (err, data) {
            return res.json(data);
        });
    }
    else {
        let reqModel = reqData.model || 'widgets'
        db[reqModel].find({}, function (err, data) {
            return res.json(data);
        });
    }
    // if (req && reqData) {
    //     console.log(reqData);
    //     let reqModel = reqData.model || 'widgets'
    //     db[reqModel].find({}, function (err, data) {
    //         return res.json(data);
    //     });
    // }

}
export const updateAnItem = (req, res) => {
    let reqData = req.body;
    if (!reqData || !reqData.model) {
        return res.json({ 'success': false, 'message': 'Model Error' });
    }
    // console.log('reqData ', reqData)
    let reqModel = reqData.model || 'widgets'
        db[reqModel].update({ uid: reqData.item.uid }, reqData.item, function (err, data) {
        if (data) {
            db[reqModel].find({}, function (err, data) {
                return res.json(data);
            })
        }
        else return res.json({ 'success': false, 'message': 'Some Error' });
    });
}
export const addAnItem = (req, res) => {
    let reqData = req.body;
    // console.log("reqData", reqData);
    if (!reqData || !reqData.model || !reqData.item) {
        return res.json({ 'success': false, 'message': 'Model Error' });
    }
    reqData.uid = randomstring.generate();
    let reqModel = reqData.model || 'widgets'
    db[reqModel].insert(reqData.item, function (err, data) {
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
    let reqData = req.body;
    if (!reqData || !reqData.model) {
        return res.json({ 'success': false, 'message': 'Model Error' });
    }
    let reqModel = reqData.model || 'widgets'
    db[reqModel].remove({ uid: reqData.uid }, function (err, data) {
        // console.log('err=', err);
        // console.log('data=', data);
        if (data) {
            db[reqModel].find({}, function (err, data) {
                return res.json(data);
            })
        }
        else return res.json({ 'success': false, 'message': 'Some Error' });
    });
}