var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index');
  /*var path = './views/index';
   res.sendFile(path, options, function(err) {
   if (err) next(new HttpError());
   });*/
});

module.exports = router;
