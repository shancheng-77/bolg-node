var express = require('express');
var router = express.Router();
var {Links} = require('../database/db')
/* GET users listing. */
// /tags
router.get('/', function(req, res, next) {
    if (req.query.type === 'all'){
        Links.find().then((result) => {
            res.send(JSON.parse(JSON.stringify(result)))
        })
    }else {
        Links.find({type:req.query.type}).then((result) => {
            res.send(JSON.parse(JSON.stringify(result)))
        })
    }
});

module.exports = router;
