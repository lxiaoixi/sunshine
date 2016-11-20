var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//媒体库
var Media = new Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: String,
    type: String,
    description: String
});


module.exports = mongoose.model('Media', Media);