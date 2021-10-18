var express = require('express');
var router = express.Router();
// var info = require('../data/project')
var {Project} = require('../database/db')
// const {Links} = require("../database/db");
/* GET users listing. */
// /tags
router.get('/', function(req, res, next) {
    Project.find().then((result) => {
        res.send(JSON.parse(JSON.stringify(result)))
    })
});

module.exports = router;
