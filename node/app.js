
var express = require('express');
var http  = require('http');
var path = require('path');
var config = require('./config');
var HttpError = require('./error').HttpError;

var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');


var bodyParser = require('body-parser');
var app = express();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var user_route = require('./routes/user'),
    publication_route = require('./routes/publication'),
    index_route = require("./routes/index");


app.use('/', index_route);
app.use('/user', user_route);
app.use('/publication', publication_route);



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


app.use(require('./middleware/sendHttperror'));

app.use(function (err, req, res, next) {
  if (typeof err == 'number') {
      err = new HttpError(err);
  }
  if (err instanceof HttpError){
      res.sendHttpError(err);
  } else {
      if (app.get('env') == 'development') {
          res.status(500);
          res.end('Error!'); // ---
      } else {
          console.log(err);
          err = new HttpError(500);
          res.sendHttpError(err);
      }
  }
})


module.exports = app;
http.createServer(app).listen(config.get('port'), function(){
  console.log('Server listening on port' + config.get('port'));
});


