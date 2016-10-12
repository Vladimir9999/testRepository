var mongoose = require('../libs/mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var user = new Schema({
    FIO: {
        type: String,
        required: true,
        default: 'Ivan'
    }
});

exports.User = mongoose.model('User', user);
