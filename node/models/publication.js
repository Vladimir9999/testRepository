var mongoose = require('../libs/mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var publication = new Schema({
    name: {
        type: String,
        require: true,
        default: 'Unknow name'
    },
    content: {
        type: String,
        require: false
    }
});

exports.Publication = mongoose.model('Publication', publication);