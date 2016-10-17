/**
 * Created by User on 17.10.2016.
 */
var express = require('express');
var router = express.Router();
var Publication = require('../models/publication').Publication;

/* LIST publication */
router.get('/', function (req, res, next) {
    Publication.find({}, function (err, publications) {
        if (err) return next(err);
        res.json(publications)
    })
});

router.get('/:id', function (req, res, next) {
    Publication.findById(req.params.id, function (err, publications) {
        if (err) return next(err);
        res.json(publications);
    });
});

/* ADD publication*/
router.put('/', function (req, res, next) {

    if (!req.body) next(err);


    var pub = new Publication({'name': req.body.name, 'content': req.body.content});
    pub.save(function (err, data) {
        if (err) {
            next(err);
        } else {
            res.render('publication added');
        }
    });

});
/* UPDATE publication */
router.post('/:id', function (req, res, next) {

    if (!req.body) {
        next(err);
    }
    Publication.findByIdAndUpdate(req.params.id, {
        'name': req.body.name,
        'content': req.body.content
    }, function (err, user) {
        if (err) {
            next(err);
        } else {
            res.render('user added');
        }
    });

});


/* DELETE publication */
router.delete('/:id', function (req, res, next) {
    Publication.findByIdAndRemove(req.params.id, function (err) {
        if (err) throw err;
        res.render('Publication deleted!');
    });
});

module.exports = router;