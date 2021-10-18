var express = require('express');
var router = express.Router();
var info = require('../data/article')
var {Course} = require('../database/db')
var arr = []
// Course.find().select("id title").sort('id').then(result => arr=result)
/* GET users listing. */

router.get('/', function(req, res, next) {
    Course.find().then(result => {
        res.send(JSON.parse(JSON.stringify(result)));
    })
});

module.exports = router;
