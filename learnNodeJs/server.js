var http = require('http');
var fs = require('fs');

var options = {
	root: __dirname + '/public/',
	host: 'localhost',
	port: 8888,
	method: 'GET'
}

http.createServer(function (req, res){
	if (req.url === '/') req.url = '/index.html';
	fs.readFile('./public'+req.url, 'utf8',  function(err, data){
			console.log(req.url);
			res.writeHead(200, {'Content-Type' : 'text/html'});
			if (err){
				res.write('404: ');
				res.end('Not found');
			}
			else{
				console.log("Ok");
				res.write(data);
				res.end();
			}				
	});	
}).listen(8888);

console.log('Server running on 8888');