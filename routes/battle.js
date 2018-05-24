var express = require('express');
var router = express.Router();
var battleController = require('../controllers/battle.controller');

router.get('/', function(req, res, next) {
    res.json({"message": "Welcome to GAME OF THRONES BATTLE application."});
});

router.get('/list', function(req, res) {
    return battleController.list(req,res);
});

router.get('/count', function(req, res, next) {
    return battleController.count(req,res);
});

router.get('/stats', function(req, res, next) {
    return battleController.stats(req,res);
});

router.get('/search', function(req, res, next) {
    return battleController.search(req,res);
});

module.exports = router;