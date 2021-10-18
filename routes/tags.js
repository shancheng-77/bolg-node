var express = require('express');
var router = express.Router();
var tags = require('../data/tags')
var ma = require('../data/materials')
var projectList = require('../data/projectList')
var {Tags} = require('../database/db')
var {Materials} = require('../database/db')

/* GET users listing. */
// /tags
router.get('/', function(req, res, next) {
    if (req.query.type === 'main'){
        Tags.find().then((result) => {
            res.send(JSON.parse(JSON.stringify(result)))
        })
    }else if (req.query.type === 'materials') {
        Materials.find().then((result) => {
            res.send(JSON.parse(JSON.stringify(result)))
        })
    }else if(req.query.type === 'project' ){
        res.send(projectList.tags)
    }
});

module.exports = router;
