var Battle = require('../models/battle.model');
var logger = require('debug')('gameofthronesbattle:controllers:battle');

module.exports.list = function(req,res){
    Battle.list(function(err,result){
        if(err){
            logger(err);
        }
        res.json(result);
    });
}

module.exports.count = function(req,res){
    Battle.count(function(err,result){
        if(err){
            logger(err);
        }
        res.json({"count":result});
    });
}

module.exports.stats = function(req,res){
    var stats ={};
    Battle.stats(function(err,battles){
        if(err){
            logger(err);
        }
        res.json(getStats(battles));
    });
}

module.exports.search = function(req,res){
    var searchQuery = {};
    if(req.query){
        if(req.query.king != null){
            searchQuery.king = req.query.king;
        }
        if(req.query.location != null){
            searchQuery.location = req.query.location;
        }
        if(req.query.type != null){
            searchQuery.type = req.query.type;
        }
    }

    Battle.search(searchQuery,function(err,result){
        if(err){
            logger(err);
        }
        res.json(result);
    });
}

function maxCountElement(arr) {
    if(arr.length == 0)
        return null;
    var o = {};
    var maxElement = arr[0], maxCount = 1;
    for(var i = 0; i < arr.length; i++) {
        var element = arr[i];
        if(o[element] == null)
            o[element] = 1;
        else
            o[element]++;
        if(o[element] > maxCount)
        {
            maxElement = element;
            maxCount = o[element];
        }
    }
    return maxElement;
}
function getUniqueElements(arr) {
    if(arr.length == 0)
        return null;
    var obj = {};
    return arr.reduce((acc, item) => {
        if(obj[item] == null)
            obj[item] = 1;
        else
            obj[item]++;
        if(obj[item] === 1) {
            if(item){
                acc.push(item);
            }
        }
        return acc;
    }, []);
}

function getStats(battles){
    if(battles.length > 0) {
        var values = {
            attacker_kings: [],
            defender_kings: [],
            regions: []
        };
        var attacker_outcome = {
            wins: 0,
            loss: 0
        };
        var battleTypes = [];
        var defenderValues = [];
        var defender_size = {};
        var defenderSum = 0;
        battles.forEach(item => {
            var obj = item.toObject();
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    switch (key) {
                        case 'attacker_king':
                            values.attacker_kings.push(obj[key]);
                            break;
                        case 'defender_king':
                            values.defender_kings.push(obj[key]);
                            break;
                        case 'region':
                            values.regions.push(obj[key]);
                            break;
                        case 'attacker_outcome':
                            if(obj[key] === 'win'){
                                attacker_outcome.wins++
                            }else if(obj[key] === 'loss'){
                                attacker_outcome.loss++;
                            }
                            break;
                        case 'battle_type':
                            battleTypes.push(obj[key]);
                            break;
                        case 'defender_size':
                            defenderValues.push(obj[key]);
                            defenderSum += (obj[key]);
                            break;
                        default:
                            break;
                    }
                }
            }
        });

        var most_active = {};
        most_active.attacker_king = maxCountElement(values.attacker_kings);
        most_active.defender_king = maxCountElement(values.defender_kings);
        most_active.region = maxCountElement(values.regions);

        var battle_types = getUniqueElements(battleTypes);
        defender_size.min = defenderValues.reduce((a, b) =>  Math.min(a, b));
        defender_size.max = defenderValues.reduce((a, b) =>  Math.max(a, b));
        defender_size.average = parseInt(defenderSum / defenderValues.length);

        return {
            most_active,
            attacker_outcome,
            battle_types,
            defender_size
        };
    }
}
