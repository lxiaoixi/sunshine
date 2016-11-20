var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Procuratorate = new Schema({

    proName: String,
    level: String,
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Procuratorate' },
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

module.exports = mongoose.model('Procuratorate', Procuratorate);