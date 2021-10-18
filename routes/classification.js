var express = require('express');
var router = express.Router();
var {Course} = require('../database/db')
var artInfo = require('../data/article')
/* GET users listing. */
router.get('/', function(req, res, next) {
    const type = req.query.type
    Course.find({type:type}).then((result => {
        res.send(JSON.parse(JSON.stringify(result)));
    }))
    // var art = artInfo.artInfo.filter(art => art.type === type)

});

module.exports = router;
