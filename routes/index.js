var express = require('express');
var passport = require('passport');
var csurf = require('csurf');
var csrfProtection = csurf({ cookie: true });
var Account = require('../models/account');
var router = express.Router();
var Procuratorate = require('../models/procuratorate');

router.get('/', function(req, res, next) {
    res.render('admin/index', { title: 'demo', user: req.user });
});

//检察院数据存储

router.get('/procuratorate', function(req, res, next) {
    res.render('procuratorate');
})

router.post('/procuratorate', function(req, res, next) {
    var proName = req.body.jcy;
    var level = req.body.level;
    var province = req.body.province;
    var address = req.body.address;

    var procuratorate = new Procuratorate({
        proName: proName,
        level: level,
        province: province,
        address: address
    });

    procuratorate.save(function(err) {
        if (err) console.log(err);
        res.redirect('/procuratorate')
    })
})

router.get('/list', function(req, res, next) {

    res.render('edit', { title: '文章列表' });
})
module.exports = router;