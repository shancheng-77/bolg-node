var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var fs = require('fs');
var marked = require( "marked" );
var path = ''
var {Course} = require('../database/db')

console.log(path)
// var path = arr.mdPath
router.post('/', function(req, res) {
    var params = req.body
    // 使用该方法查询id符合的md文件
    Course.find({id:params.id}).then(result => {
            // var arr = result.toArray()
            result.forEach(function(e){
                path = e.mdPath
                // console.log(path)
                // find()方法为异步操作，所以应将其放在这里
                fs.readFile(path, function(err, data){
                    if(err){
                        console.log(err);
                        res.send("文件不存在！");
                    }else{
                        // console.log(data);
                        str = marked(data.toString());
                        // console.log(str);
                        // res.json(str) ;
                        res.json(str)
                    }
                });
            })
        }
    )
    // res.send(typeof arr)
});
module.exports = router;
