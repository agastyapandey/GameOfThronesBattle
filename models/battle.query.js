var logger = require('debug')('gameofthronesbattle:queries:battle');

function battle() {
    return require('../models/battle.model');
}

module.exports.list = function(callback) {
    battle().distinct("location",{"location": {$ne: ""} })
        .lean()
        .exec(function(err, res) {
            callback(err, res);
        });
}

module.exports.count = function(callback) {
    battle().find()
        .select("battle_number")
        .lean()
        .count()
        .exec(function(err, res) {
            callback(err, res);
        });
}

module.exports.stats = function(callback) {
    battle().find()
        .select()
        .exec(function(err, res) {
            callback(err, res);
        });
}

module.exports.search = function(searchQuery,callback) {
    var queryString = generateSearchQueryString(searchQuery);
    battle().find(queryString)
        .select()
        .lean()
        .exec(function(err, res) {
            callback(err, res);
        });
}

function generateSearchQueryString(searchQuery){
    var queryString = '';
    if(searchQuery.type != null){
        if(queryString != '' && queryString != null){
            queryString = queryString+',"battle_type":"'+searchQuery.type+'"';
        }else{
            queryString = '"battle_type":"'+searchQuery.type+'"';
        }
    }
    if(searchQuery.location != null){
        if(queryString != '' && queryString != null){
            queryString = queryString+',"location":"'+searchQuery.location+'"';
        }else{
            queryString = '"location":"'+searchQuery.location+'"';
        }
    }
    if(searchQuery.king != null){
        if(queryString != '' && queryString != null){
            queryString = queryString+',"$or":[{"attacker_king":"'+searchQuery.king+'"},{"defender_king":"'+searchQuery.king+'"}]';
        }else{
            queryString = '"$or":[{"attacker_king":"'+searchQuery.king+'"},{"defender_king":"'+searchQuery.king+'"}]';
        }
    }
    return JSON.parse("{"+queryString+"}");
}