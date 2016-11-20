var express = require('express');
var passport = require('passport');
var csurf = require('csurf');
var csrfProtection = csurf({ cookie: true });
var Account = require('../models/account');
var router = express.Router();
var Procuratorate = require('../models/procuratorate');
var LiasionPeople = require('../models/liasionpeople');
var StreetBlock = require('../models/streetblock');
var Charge = require('../models/charge');
var auth = require('../middlewares/authrization');
var upload = require('../config/fileuploads');
router.get('/', auth.requireLogin, function(req, res, next) {
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


//前台控诉举报
router.get('/accuse', function(req, res, next) {
    res.render('accuse', { title: '控诉举报' });
})

router.post('/accuse', function(req, res, next) {
    var name = req.body.name;
    var tel = req.body.tel;
    var content = req.body.content;
    var type = req.body.type;
    var charge = new Charge({
        name: name,
        tel: tel,
        content: content,
        type: type
    })

    charge.save(function(err, doc) {
        if (err) console.log(err);
        console.log(doc);
        res.redirect('/accuse');
    })
})

//后台获取举报信息页面
router.get('/chargemessage', function(req, res, next) {
    Charge.find({}, function(err, charges) {
        res.render('chargeMessage', { title: '举报', charges: charges });
    })
})

//后台巡检室主任页面
router.get('/liasion', function(req, res, next) {
    res.render('liasionPeople', { title: '巡检室主任' });
})

router.post('/liasion', function(req, res, next) {
        var name = req.body.name;
        var tel = req.body.tel;
        var address = req.body.address;
        var liasionpeople = new LiasionPeople({
            name: name,
            tel: tel,
            address: address
        })
        liasionpeople.save(function(err, doc) {
            if (err) console.log(err);

            res.redirect('/liasion')
        })

    })
    //后台街道办
router.get('/streetBlock', function(req, res, next) {
    res.render('streetblock', { title: '街道办' });
})

router.post('/streetBlock', function(req, res, next) {
    var streetName = req.body.streetName;
    var content = req.body.content;
    var streetblock = new StreetBlock({
        streetName: streetName,
        content: content
    })

    streetblock.save(function(err, doc) {
        if (err) console.log(err);
        console.log(doc);
        res.redirect('/streetBlock');
    })
})

//上传文件
router.get('/upload', function(req, res, next) {
    res.render('upload', { title: '上传文件' });
})
router.post('/upload', upload.single('avatar'), function(req, res, next) {
    if (req.file) {
        res.send('文件上传成功')
        console.log(req.file);
        console.log(req.body);
    }
});
router.get('/aa', function(req, res, next) {
    res.render('aa', { title: '上传文件' });
})
module.exports = router;