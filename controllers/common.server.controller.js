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
var createSearchQuery = function (reqData) {
    let searchText = reqData.searchText || "";
    let searchFields = reqData.searchFields || false;
    let caseSensitive = reqData.caseSensitive || false;
    if (!searchText || searchText === "" || !searchFields || searchFields.length === 0)
        return false;
    let searchQueryArray = [];
    let searchTextArray = searchText.split(" ");
    for (let i = 0; i < searchFields.length; i++) {
        for (let j = 0; j < searchTextArray.length; j++) {
            let singleQuery = { [searchFields[i]]: { $regex: searchTextArray[j] } }
            if (caseSensitive) {
                _.extend(singleQuery, { $option: "i" })
            }
            searchQueryArray.push(singleQuery);
        }
    }
    // console.log(searchQueryArray)
    return { $or: searchQueryArray }
}
var getAggregationArray = function (req) {
    let reqData = req;
    let match = reqData.match || {};
    let limit = reqData.limit || 10;
    let skip = reqData.skip || 0;
    let sort = reqData.sort || { createdBy: -1 };
    let project = reqData.project || 0;
    let aggregateArray = []
    let searchQuery = createSearchQuery(reqData)
    match = _.extend(match, searchQuery);
    aggregateArray.push({ $match: match });
    var matchQuery = _.concat([], aggregateArray)
    matchQuery.push({$count:"totalRecords"})
    aggregateArray.push({ $sort: sort });
    if (skip) {
        aggregateArray.push({ $skip: skip });
    }
    if (limit) {
        aggregateArray.push({ $limit: limit });
    }
    if (project) {
        aggregateArray.push({ $project: project });
    }

    return {matchQuery, aggregateArray};
}
exports.getAllItems = (req, res) => {
    let reqData = req.body.options;
    let reqModel = reqData.model //|| 'widgets';
    // console.log(reqData);
    let aggregateQueries = getAggregationArray(reqData);
    console.log(aggregateQueries)
    db[reqModel].aggregate(aggregateQueries.matchQuery, function (err, rawData) {
        console.log(rawData);        
        if (rawData && rawData[0] && rawData[0].totalRecords) {
            db[reqModel].aggregate(aggregateQueries.aggregateArray, function (err, records) {
                // console.log(data);
                return res.json({records, totalRecords:rawData[0]});
            });    
        } else {
            return res.json(rawData);
        }
        
    });
}
// export const getAnItems = (req, res) => {
//     let reqData = req.body.options;
//     // console.log(reqData);
//     let reqModel = reqData.model //|| 'widgets';
//     let aggregateArray = getAggregationArray(req);
//     db[reqModel].find({ uid: reqData.uid },function (err, data) {
//         // console.log(data);
//         return res.json(data);
//     });
// }
exports.updateAnItem = (req, res) => {
    let reqData = req.body.options;
    if (!reqData || !reqData.model) {
        return res.json({ 'success': false, 'message': 'Model Error' });
    }
    let reqModel = reqData.model //|| 'widgets';
    reqData.uid = reqData.uid || reqData.item.uid;
    reqData.item.updatedAt = new Date();
    db[reqModel].update({ uid: reqData.uid }, reqData.item, function (err, data) {
        if (data) {
            getAllItems(req, res)
        }
        else return res.json({ 'success': false, 'message': 'Some Error' });
    });
}
exports.addAnItem = (req, res) => {
    let reqData = req.body.options;
    if (!(reqData && reqData.model && reqData.data)) {
        return res.json({ 'success': false, 'message': 'Model Error' });
    }
    reqData.data.uid = randomstring.generate();
    reqData.data.createdAt = new Date();
    reqData.data.updateAt = new Date();
    let reqModel = reqData.model //|| 'widgets'
    console.log("reqModel", reqData);
    db[reqModel].insert(reqData.data, function (err, data) {
        if (data) {
            if (data) {
                getAllItems(req, res)
            }
        }
        else return res.json({ 'success': false, 'message': 'Some Error' });
    });
}

exports.removeAnItem = (req, res) => {
    let uid = req.body.options.uid;
    let reqData = req.body.options;
    if (!reqData || !reqData.model) {
        return res.json({ 'success': false, 'message': 'Model Error' });
    }
    let reqModel = reqData.model //|| 'widgets'
    db[reqModel].remove({ uid: reqData.uid }, function (err, data) {
        if (data) {
            if (data) {
                getAllItems(req, res)
            }
        }
        else return res.json({ 'success': false, 'message': 'Some Error' });
    });
}
