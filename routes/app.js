var auth = require('../lib/auth');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('index')
});

router.get('/register', function(req, res){
    res.render('register')
});

router.post('/register', function(req, res){
    auth.register(req.body.username, req.body.password, req.body.name, req.body.thumbnail, function (success, user) {
        res.redirect('/register')
    })
});

// router.get('/chat', function(req, res){
//     res.render('chat')
// });
//
// router.get('/login', function(req, res){
//     res.render('login')
// });

module.exports = router;