var User = require('./models/User').User;


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://127.0.0.1/test');
mongoose.set('debug', true);

mongoose.connection.on('open', function(){

    var user = new User({'FIO': 'Vasya'});
    user.save(function(err, data){
        console.log('fff');
        if(err){
            console.log('err');
        } else{
            console.log(data);
            //res.render('user/added', {title: 'Uses added', user: user})
        }
    });

    User.find({}, function(err, users){
        if(err) return console.log(err);
        console.log(users);
    });

    mongoose.disconnect();
});
/*function createUser(name){
    var user = new User({FIO: name});
    user.save();// Добавить обработчик ошибок
}
function dropDB(){
    var db = mongoose.connection.db;
    db.dropDatabase();
}
mongoose.connection.on('open', function(){
   var db = mongoose.connection.db;
    db.dropDatabase(function(err){
        if (err) throw err;
        //createUser('Vasya');
        //mongoose.disconnect();
        console.log('OK');
    });
});*/

/*var user = new User({
    FIO: 'Vasya'
});*/



