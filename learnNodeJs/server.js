var http = require('http');
var fs = require('fs');
var procces = require('process');

var users = [];


var stream = fs.createReadStream('./public/users.json');
stream.on('data', function (chunk) {
    users = JSON.parse(chunk);
});
/*
 fs.readFile('./public/users.json','utf8',  function(err, data){
 users = JSON.parse(data);
 });
 */


function getFile(req, res) {
    if (req.url === '/') req.url = '/index.html';
    res.writeHead(200, {'Content-Type': 'text/html'});
    var stream = fs.createReadStream('./public' + req.url, {encoding: 'utf-8'});
    stream.on('readable', function () {
        var data = stream.read();
        if (data != null)
            res.write(data);
    });
    stream.on('end', function () {
        res.end();
    })
    stream.on('error', function () {
        res.write('ERROR: 404 Not found');
        res.end();
    });
}
function appGet(req, res, url) {

    if (!url[2]) {
        if (users.length == 0) res.write('list empty');
        for (var i = 0; i < users.length; i++) {
            res.write(i + ': ' + users[i]._FIO + '\r\n');
        }
    } else {
        var index = parseInt(url[2], 10);
        if (index >= users.length) {
            res.write('User is not found');
        }
        else
            res.write(index + ': ' + users[index]._FIO + '\r\n');
    }


    res.end();
}
//update
function appPut(req, res, url) {

    if (url[2]) {
        var postData = "";
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        req.addListener("end", function () {
            var index = parseInt(url[2], 10);
            if (index >= users.length) {
                res.write('User is not found');
            }
            else {
                users[users[index]] = JSON.parse(postData);
            }
        });


    }
    res.end();
}
// add
function appPost(req, res, url) {
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end", function () {
        users[users.length] = JSON.parse(postData);
        res.end();
    });
}
// Delete
function appDel(req, res, url) {
    if (url[2]) {
        var index = parseInt(url[2], 10);
        if (index >= users.length) res.write('user is not found');
        else {
            res.write('Delete user - ' + users[index]._FIO);
            users.splice(index, 1);
            //users[index] = {}; // Изменить на нормальное удаление
        }
    }
    res.end();
}

http.createServer(function (req, res) {
    var url = req.url.split('/');
    if (url[1] == 'user') {
        switch (req.method) {
            case 'GET':
                appGet(req, res, url);
                break;
            case 'PUT':
                appPut(req, res, url);
                break;
            case 'POST':
                appPost(req, res, url)
                break;
            case 'DELETE':
                appDel(req, res, url);
                break;
        }
    } else getFile(req, res);

}).listen(8888);
console.log('Server running on 8888');
