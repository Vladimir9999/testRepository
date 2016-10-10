var http = require('http');
var fs = require('fs');
var procces = require('process');

var users = [];

(function (){
	fs.readFile('./public/users.json','utf8',  function(err, data){
		users = JSON.parse(data);
		console.log('users.json loaded');
	});
})();



function getFile(req, res){
		if (req.url === '/') req.url = '/index.html';
		fs.readFile('./public'+req.url, 'utf8',  function(err, data){
				res.writeHead(200, {'Content-Type' : 'text/html'});
				if (err){
					res.write('404: Not found');
					res.end();
				}
				else{
					console.log("Ok");
					res.write(data);
					res.end();
				}
		});	
}
function appGet(req, res, url){
		console.log('GET');

		if (!url[2])
		{
			if (users.length == 0) res.write('list empty');
			for(var i = 0; i < users.length; i++){
				res.write(i + ': ' + users[i]._FIO + '\r\n');
				console.log(users[i]._FIO);
			}
		}else{
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
function appPost(req, res, url){

	if(url[2]){
		console.log(req.method);
		var postData = ""; 
		req.addListener("data", function(postDataChunk) { 
			postData += postDataChunk; 
		}); 	
		req.addListener("end", function() {			
			var index = parseInt(url[2], 10);
			if (index >= users.length) {
				res.write('User is not found');
			}					
			else{
				users[users[index]] = JSON.parse(postData);
				console.log(users[users.length - 1]._FIO + '- new user');
			} 			
	    });	
		
					
	}
	res.end();			
}
// add
function appPut(req, res, url){
		console.log(req.method);
		var postData = ""; 
		req.addListener("data", function(postDataChunk) { 
			postData += postDataChunk; 
		}); 

		req.addListener("end", function() {			
			users[users.length] = JSON.parse(postData);		
			console.log(users[users.length - 1] + '- new user');							
			res.end();			
	    });				
}
// Delete
function appDel(req, res, url){
	if(url[2]){
		var index = parseInt(url[2], 10);
		if (index >= users.length) res.write('user is not found');
		else {
			res.write('Delete user - ' + users[index]._FIO);
			users[index] = {}; // Изменить на нормальное удаление				
		}
	} 
	res.end(); 
}

http.createServer(function (req, res){
	var url = req.url.split('/');
	console.log(url);
	if (url[1] == 'user'){
		switch(req.method){
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
	}else getFile(req, res);

}).listen(8888);
console.log('Server running on 8888');
