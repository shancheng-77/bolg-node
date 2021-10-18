var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test')
var tagsRouter = require('./routes/tags')
var cfaRouter = require('./routes/classification')
var articlesRouter = require('./routes/mark')
var linsRouter  = require('./routes/links')
var projectRouter = require('./routes/project')
// var DB = require('./database/db')
var app = express();

// view engine setupapp.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 跨域问题
app.use(cors());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article',testRouter);
app.use('/tags',tagsRouter)
app.use('/classification',cfaRouter)
app.use('/articles',articlesRouter)
app.use('/links',linsRouter)
app.use('/project',projectRouter)
// app.use('/db',DB)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', './build/index.html'))
})
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
