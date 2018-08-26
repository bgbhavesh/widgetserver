// ./express-server/controllers/notes.server.controller.js
//import models

//import Notes from '../models/notes.server.model';
var randomstring = require("randomstring");
import db from '../api/app';
var _ = require('lodash/core');
var ObjectId = require('mongodb').ObjectID;
// reqDemo = {};
// reqDemo.match;
// reqDemo.sort;
// reqDemo.skip;
// reqDemo.limit;
// reqDemo.project;


// reqDemo.item;
// reqDemo.itemId;
// reqDemo.uid
var createSearchQuery = function (searchText, caseSensitive) {
    // if(!searchText || searchText==="" || !searchFields || searchFields.length === 0 ) return false;
    return  { $text: { $search: searchText, $caseSensitive: caseSensitive } }
}
var getAggregationArray = function (req) {
    let reqData = req;
    let match = reqData.match || {};
    let limit = reqData.limit || 0;
    let skip = reqData.skip || 0;
    let sort = reqData.sort || {createdBy: -1};
    let project = reqData.project || 0;
    let searchText = reqData.searchText || "";
    let searchFields = reqData.searchFields || false;
    let aggregateArray = []
    let searchQuery = createSearchQuery(searchText, searchFields)
    
    match = _.extend(match,searchQuery);
    console.log(match)
    aggregateArray.push({$match:match});
    aggregateArray.push({$sort:sort});

    if(skip){
        aggregateArray.push({$skip:skip});
    }
    if(limit){
        aggregateArray.push({$limit:limit});
    }
    if(project){
        aggregateArray.push({$project:project});
    }
    return aggregateArray;
}

export const getAllItems = (req, res) => {
    let reqData = req.body.options;
    let reqModel = reqData.model //|| 'widgets';
    console.log(reqData);
    let aggregateArray = getAggregationArray(reqData);
    
    db[reqModel].aggregate(aggregateArray,function (err, data) {
        // console.log(data);
        return res.json(data);
    });
}
export const getAnItems = (req, res) => {
    let reqData = req.body.options;
    console.log(reqData);
    let reqModel = reqData.model //|| 'widgets';
    let aggregateArray = getAggregationArray(req);
    db[reqModel].find({ uid: reqData.uid },function (err, data) {
        // console.log(data);
        return res.json(data);
    });
}
export const updateAnItem = (req, res) => {
    let reqData = req.body.options;
    if (!reqData || !reqData.model) {
        return res.json({ 'success': false, 'message': 'Model Error' });
    }
    let reqModel = reqData.model //|| 'widgets';
    reqData.uid = reqData.uid || reqData.item.uid; 
    reqData.item.updatedAt = new Date();
    db[reqModel].update({ uid: reqData.uid }, reqData.item, function (err, data) {
        if (data) {
            db[reqModel].find({}, function (err, data) {
                return res.json(data);
            })
        }
        else return res.json({ 'success': false, 'message': 'Some Error' });
    });
}
export const addAnItem = (req, res) => {
    let reqData = req.body.options;
    if (!(reqData && reqData.model && reqData.item)) {
        return res.json({ 'success': false, 'message': 'Model Error' });
    }
    reqData.item.uid = randomstring.generate();
    reqData.item.createdAt = new Date();
    reqData.item.updateAt = new Date();
    let reqModel = reqData.model //|| 'widgets'
    console.log("reqModel", reqModel);
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
    let uid = req.body.options.uid;
    let reqData = req.body.options;
    if (!reqData || !reqData.model) {
        return res.json({ 'success': false, 'message': 'Model Error' });
    }
    let reqModel = reqData.model //|| 'widgets'
    db[reqModel].remove({ uid: reqData.uid }, function (err, data) {
        if (data) {
            db[reqModel].find({}, function (err, data) {
                return res.json(data);
            })
        }
        else return res.json({ 'success': false, 'message': 'Some Error' });
    });
}
