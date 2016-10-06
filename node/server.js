/**
 * Created by User on 05.10.2016.
 */
var express = require('express');
var app = express();
var fs = require('fs');

var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};

app.get('/', function(req, res, next){
    var path = 'index.html';
    res.sendFile(path, options, function(err) {
        if (err) {
            console.log('err');
            next(err);
        } else {
            console.log('transferred');
        }
    });
});

app.get('/:id', function(req, res, next){
    //var str = req.params.id;
   // var file = fs.readFileSync('./public/'+req.params.id, 'utf8');
    //res.send(file);
    var path = req.params.id;
    res.sendFile(path, options, function(err) {
        if (err) {
            console.log('error');
            next(err);
        } else {
            console.log('transferred');
        }
    });
});

app.get('/*', function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    console.error(err.status);
    switch(err.status) {
        case 500: res.send('500');
            break;
        case 404: res.send('404');
            break;
    }
});

app.listen(3000);

