var mongoose = require('../libs/mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var user = new Schema({
    FIO: {
        type: String,
        required: true,
        default: 'Ivan'
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: 'publication'
    }
});


exports.User = mongoose.model('User', user);
