var http = require('http');
var fs = require('fs');
var procces = require('process');
var User = require('./User');
var users = [];

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
function appGet(req, res){
		console.log('GET');
		var url = req.url.split('/');
		console.log(url);
		if (url[1] === 'listUser')
		{
			if (!url[2])
			{
				if (users.length == 0) res.write('list empty');
				for(var i = 0; i < users.length; i++){
					res.write(i + ': ' + users[i].name + '\r\n');
					console.log(users[i].name);
				}
			}else{
				var index = parseInt(url[2], 10);
				if (index >= users.length) {
					res.write('User is not found');
				}
				else
					res.write(index + ': ' + users[index].name + '\r\n');
			}
			res.end();
		}
		else{
			getFile(req, res);
		}	
}
// add/update
function appPost(req, res){
		console.log(req.method);
		var postData = ""; 
		req.addListener("data", function(postDataChunk) { 
			postData += postDataChunk; 
		}); 

		req.addListener("end", function() {
			var url = req.url.split('/');
			console.log(url);			
			if (url[1] == 'addUser'){
				users[users.length] = JSON.parse(postData);		
				console.log(users[users.length - 1]);				
			}
			else if (url[1] = 'updateUser'){
				if(url[2]){
					var index = parseInt(url[2], 10);
					if (index >= users.length) {
						res.write('User is not found');
					}					
					else{
						users[users.index] = JSON.parse(postData);
						console.log(users[users.length - 1]);
					} 						
				}
			}			
			res.end();
			
	    });				
}
// Delete
function appDel(req, res){
	var url = req.url.split('/');
	console.log(url);
	if (url[1] = 'Del'){
		if(url[2]){
			var index = parseInt(url[2], 10);
			if (index >= users.length) res.write('user is not found');
			else {
				res.write('Delete user - ' + users[index].name);
				users[index] = {}; // Изменить на нормальное удаление				
			}
		} 
	} else res.end('Error'); 
	res.end(); 
}

http.createServer(function (req, res){

	switch(req.method){
		case 'GET':
			appGet(req, res);
			break;
		case 'POST':
			appPost(req, res)
			break;
		case 'DELETE':
			appDel(req, res);
			break;
	}


}).listen(8888);
console.log('Server running on 8888');
