var http = require('http');
var fs = require('fs');
var procces = require('process');
var User = require('./User');
var users = [];

http.createServer(function (req, res){
	if (req.url === '/') req.url = '/index.html';
	
	fs.readFile('./public'+req.url, 'utf8',  function(err, data){

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

procces.stdin.resume();
process.stdin.on('data', function (chunk){
	
	var command = chunk.toString(),
		command_array = command.split(' '),
		str = command_array[command_array.length - 1];
	command_array[command_array.length - 1] = str.substring(0, str.length - 2); // Удаление двух последних символов '\r\n'
	
	//console.log(command_array);
	//Обработчик команд 
	switch(command_array[0])
	{
		// load [file]
		case 'load':{
			fs.readFile('./public/' + command_array[1],'utf8',  function(err, data){
				if (err)
				{
					console.log('ERROR! File not found');
				}else
				{
					users = JSON.parse(data);
					//console.log('Object- ' + users[0]._FIO + ' ' + users.length);
					console.log(command_array[1] + ' loaded');
				}

			});
			break;
		}		
		// insert user [name]
		case 'insert':{
			if (command_array[1] == 'user'){
				users[users.length] = new User(command_array[2]);
				console.log('user: ' + users[users.length - 1]._FIO + ' added');
			}
			else console.log('\'' + command_array[1] + '\'' + ' is not defined');
			break;
		}
		//update user index [name]
		case 'update':{
			if (command_array[1] == 'user' && command_array[2] < users.legth){
				var tmp = users[command_array[2]]._FIO;
				users[command_array[2]]._FIO = command_array[3];
				console.log('old user ' + tmp + ' new user ' + users[command_array[2]]._FIO)
			}
			else console.log('\'' + command_array[1] + '\'' + ' is not defined');
			break;
		}
		//delte
		case 'delete':{
			console.log(users.pop()._FIO + ' delete')
			break;
		}
		//list
		case 'list':{
			console.log('users list');
			if (users.length == 0) console.log('list empty');
			for(var i = 0; i < users.length; i++){
				console.log(i + ': ' + users[i]._FIO + '\r\n');				
			}
			break;
		}
		default: console.log('\'' + command_array[0] + '\'' + ' is not defined');
	}
});

console.log('Server running on 8888');
