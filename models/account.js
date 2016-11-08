var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    email: String,
    mobile: String,
    procuratorate: { type: mongoose.Schema.Types.ObjectId, ref: 'Procuratorate' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    openid: String,
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    remark: String,
    isExpired: Boolean
});

//定制本地策略
Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);