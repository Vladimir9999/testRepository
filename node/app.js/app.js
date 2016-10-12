var express = require('express');
var http  = require('http');
var path = require('path');
var config = require('config');
//var log = require('libs/log')(module);

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');


var bodyParser = require('body-parser');
var app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));

var routes = require('./routes/index');
var users = require('./routes/users');
app.use('/users', users);
app.use('/', routes);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.set('port', config.get('port'));

var User = require('./models/User').User;
//List users
app.get('/user', function(req, res, next){
  User.find({}, function(err, users){
    if(err) return next(err);
    res.json(users);
  });
});
//add user(PUT)
app.put('/user',function(req, res, next){
    console.log(req.body);
    if (req.body.FIO){
      console.log('put');
      var user = new User({'FIO': req.body.FIO});

      user.save(function(err, data){
        if(err){
          res.send(err);
        } else{
          console.log(data);
          res.render('user/added', {title: 'Uses added', user: user})
        }
      });
      console.log("new User " + req.body.FIO);
    } else next();
});

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



/*app.get('/user/:id', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err) return next(err);
    res.json(user);
  });
});*/



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