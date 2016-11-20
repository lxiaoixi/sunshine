//媒体库路由
var express = require('express');
var router = express.Router();
var upload = require('../config/fileuploads');
var Media = require('../models/media');


//上传文件
router.get('/upload', function(req, res, next) {
    res.render('upload', { title: '上传文件' });
})
router.post('/upload', upload.single('avatar'), function(req, res, next) {

    var media = new Media({
        //multer会将上传的文件的信息写到 req.file 上
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        type: req.body.mediatype,
        description: req.body.description
    })
    media.save(function(err, media) {
        if (err) console.log(err);
        console.log(media);

        res.redirect('/media/upload');
    })

});

//获取图片信息

router.get('/images', function(req, res, next) {

    Media.find({ type: 'image' }, function(err, images) {
        console.log(images);

        res.render('images', { title: '图片信息', images: images });
    })
})

//获取视频信息
router.get('/videos', function(req, res, next) {
    Media.find({ type: 'video' }, function(err, videos) {
        console.log(videos);

        res.render('videos', { title: '视频信息', videos: videos });
    })
})

//获取音频消息
router.get('/audio', function(req, res, next) {
    Media.find({ type: 'audio' }, function(err, audios) {
        console.log(audios);

        res.render('audios', { title: '音频信息', audios: audios });
    })
})


module.exports = router;