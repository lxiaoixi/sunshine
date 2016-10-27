var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Company = new Schema({
    name: String,
    level:String,
    province: String,
    region: String,
    county: String,
    address: String,
    postcode: String,
    phone: String,
    mobile: String,
    picture: String,
    location: String,
    remark: String,
    wechat: String,
    weibo: String,
    toutiao: String,
    website: String
});

module.exports = mongoose.model('Company', Company);