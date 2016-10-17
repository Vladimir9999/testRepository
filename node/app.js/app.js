
var express = require('express');
var http  = require('http');
var path = require('path');
var config = require('config');
//var log = require('libs/log')(module);

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');


//var bodyParser = require('body-parser');
var app = express();

//var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data
//app.use(express.bodyParser());
//app.use(bodyParser());

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json({ type: 'application/*+json' }));

/* ROUTES */
var user_route = require('./routes/user'),
    publication_route = require('./routes/publication');

app.use('/user', user_route);
app.use('/publication', publication_route);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var allowCrossDomain = function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', config.get('port'));
app.use(allowCrossDomain);

app.get('/', function(req, res, next){
  var path = 'index.html';
  res.sendFile(path, options, function(err) {
    if (err) next(err);
  });
});

app.get('/:id', function(req, res, next){
  var path = req.params.id;
  res.sendFile(path, options, function(err) {
    if (err) {
      console.log('err');
      next(err);
    }
  });
});




app.use(function (err, req, res, next) {
  res.end('ERROR');
})


module.exports = app;
http.createServer(app).listen(config.get('port'), function(){
  console.log('Server listening on port' + config.get('port'));
});










/*
// uncomment after placing your favicon in /public
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

*/
