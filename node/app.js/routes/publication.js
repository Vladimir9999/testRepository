/**
 * Created by User on 17.10.2016.
 */
var express = require('express');
var router = express.Router();
var Publication = require('../models/publication').Publication;

/* LIST publication */
router.get('/',function (req, res, next) {
    Publication.find({}, function(err, publications){
        if(err) return next(err);
        res.json(publications)
    })
});

router.get('/:id', function(req, res, next){
    Publication.findById(req.params.id, function(err, publications){
        if(err) return next(err);
        res.json(publications);
    });
});

/* ADD publication*/
router.put('/',function(req, res, next){
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end", function () {
        console.log(postData);
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
/* UPDATE publication */
router.post('/:id', function (req, res, next) {
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


/* DELETE publication */
router.delete('/:id', function(req, res, next){
    Publication.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        res.render('Publication deleted!');
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