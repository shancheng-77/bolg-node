var express = require('express');
var mongoose = require('mongoose')
// var router = express.Router();
var info = require('../data/article')
var tags = require('../data/tags')
var ma = require('../data/materials')
var project = require('../data/project')
var links = require('../data/linkList')
// 此处为服务器的实验
mongoose.connect('mongodb://localhost:27017/blogDB',{ useUnifiedTopology: true,useNewUrlParser: true}).then(()=> console.log("数据库链接成功")) //连接本地数据库
/* GET users listing. */
// 文章目录信息
const courseSchema = new mongoose.Schema({
    id:Number,
    type:String,
    title:String,
    description:String,
    createTime:String,
    mdPath:String
})
// 文章分类信息
const tagsSchema = new mongoose.Schema({
    title:String,
    key:String,
    children:[{
        title:String,
        key:String
    }]
})
const linkSchema = new mongoose.Schema({
    title:String,
    describe:String,
    link:String,
    type:String,
})
const projectSchema = new mongoose.Schema({
    title:String,
    link:String,
    content:String,
    type:String
})
const Course = mongoose.model('Course',courseSchema)
const Tags = mongoose.model('Tags',tagsSchema)
const Materials = mongoose.model('Materials',tagsSchema)
const Links = mongoose.model('Links',linkSchema)
const Project = mongoose.model('Project',projectSchema)
// 更新数据
// Course.create(info.artInfo)
// Tags.create(tags.tags)
// Materials.create(ma.tags)
// Links.create(links.link)
// Project.create(project.Info)
// var arr = []
// Course.find().then(result => arr=result)
// console.log(arr)
module.exports = {Course,Tags,Materials,Links,Project};
