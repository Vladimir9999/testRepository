var express = require('express');
var router = express.Router();
var User = require('../models/User').User;


/* GET users listing. */
router.get('/', function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        //res.json(users);
        res.render("users", {users: users});
    });

});

router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});

/* ADD User*/
router.put('/', function (req, res, next) {
    if (!req.body) {
        next(err);
    }
    var user = new User({FIO: req.body.FIO, publication: req.body.publication});
    user.save(function (err, data) {
        if (err) {
            next(err);
        } else {
            res.render('user added');
        }
    });

});

/* Update user*/
router.post('/:id', function (req, res, next) {
    if (!req.body) {
        next(err);
    }
    User.findByIdAndUpdate(req.params.id, {FIO: req.body.FIO, publication: req.body.publication}, function (err, user) {
        if (err) {
            next(err);
        } else {
            res.render('user added');
        }
    });


});
/* DELETE user*/
router.delete('/:id', function (req, res, next) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) next(err);
        console.log('User deleted!');
    });
});

module.exports = router;
