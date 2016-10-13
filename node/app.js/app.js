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

var routes = require('./routes/index');

app.use('/', routes);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', config.get('port'));


var User = require('./models/User').User;
var Publication = require('./models/publication').Publication;
/*-----------add user-------------------*/

app.put('/user',function(req, res, next){
  var postData = "";
  req.addListener("data", function (postDataChunk) {
    postData += postDataChunk;
  });

  req.addListener("end", function () {
    var obj = bodyParse(postData);
    if (!obj){
      res.end("Error");
      return;
    }
    var user = new User({FIO: obj.FIO, publication: obj.publication});
    user.save(function(err, data){
      if(err){
        res.send(err);
      } else{
        res.render('user added');
      }
    });
  });
});

//List users

app.get('/user', function(req, res, next){
  User.find({}, function(err, users){
    if(err) return next(err);
    res.json(users);
  });
});


app.get('/user/:id', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err) return next(err);
    res.json(user);
  });
});

// UPDATE user

app.post('/user/:id', function (req, res, next) {
  var postData = "";
  req.addListener("data", function (postDataChunk) {
    postData += postDataChunk;
  });
  req.addListener("end", function (err) {
        var obj = bodyParse(postData);
        if (!obj){
          res.end("Error");
          return;
        }
        User.findByIdAndUpdate(req.params.id, {FIO: obj.FIO, publication: obj.publication}, function(err, user){
          if(err){
            res.send(err);
          } else{
            res.render('user added');
          }
        });
  });

});

app.delete('/user/:id', function(req, res, next){
  User.findByIdAndRemove(req.params.id, function(err) {
    if (err) throw err;
    console.log('User deleted!');
  });
});

/*---------------Publication-------------------*/
// list publications
app.get('/public',function (req, res, next) {
  Publication.find({}, function(err, publications){
    if(err) return next(err);
    res.json(publications)
  })
});

app.get('/public/:id', function(req, res, next){
  Publication.findById(req.params.id, function(err, publications){
    if(err) return next(err);
    res.json(publications);
  });
});

/*-----------add publication-------------------*/
app.put('/public',function(req, res, next){
  var postData = "";
  req.addListener("data", function (postDataChunk) {
    postData += postDataChunk;
  });

  req.addListener("end", function () {
    var obj = bodyParse(postData);
    if (!obj){
      res.end("Error");
      return;
    }

    var pub = new Publication({'name': obj.name, 'content': obj.content});
    pub.save(function(err, data){
      if(err){
        res.send(err);
      } else{
        res.render('publication added');
      }
    });
  });
});
//Update publication
app.post('/public/:id', function (req, res, next) {
  var postData = "";
  req.addListener("data", function (postDataChunk) {
    postData += postDataChunk;
  });
  req.addListener("end", function (err) {
    var obj = bodyParse(postData);
    if (!obj){
      res.end("Error");
      return;
    }
    Publication.findByIdAndUpdate(req.params.id, {name: obj.name, content: obj.content}, function(err, user){
      if(err){
        res.send(err);
      } else{
        res.render('user added');
      }
    });
  });

});


// delete publication
app.delete('/public/:id', function(req, res, next){
  Publication.findByIdAndRemove(req.params.id, function(err) {
    if (err) throw err;
    res.render('Publication deleted!');
  });
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




app.use(function (err, req, res, next) {
  res.end('ERROR');
})

module.exports = app;
http.createServer(app).listen(config.get('port'), function(){
  console.log('Server listening on port' + config.get('port'));
});

function bodyParse(data){
  try{
    var obj = JSON.parse(data);
    return obj;
  }catch(e) {
    console.log(e);
  }
}








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