var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    FIO: {
        type: String,
        required: true,
        default: 'Ivan'
    }
});

exports.User = mongoose.model('User', user);
