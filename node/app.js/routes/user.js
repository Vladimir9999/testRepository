var express = require('express');
var router = express.Router();
var User = require('../models/User').User;

/* GET users listing. */
router.get('/', function(req, res, next){
  User.find({}, function(err, users){
    if(err) return next(err);
    res.json(users);
  });
});

router.get('/:id', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err) return next(err);
    res.json(user);
  });
});

/* ADD User*/
router.put('/user',function(req, res, next){
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

/* Update user*/
router.post('/user/:id', function (req, res, next) {
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
/* DELETE user*/
router.delete('/:id', function(req, res, next){
  User.findByIdAndRemove(req.params.id, function(err) {
    if (err) throw err;
    console.log('User deleted!');
  });
});

function bodyParse(data){
  try{
    var obj = JSON.parse(data);
    return obj;
  }catch(e) {
    console.log(e);
  }
}
module.exports = router;
