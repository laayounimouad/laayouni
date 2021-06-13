var express = require('express');
var router = express.Router();
router.use(express.static('public'));
router.get('/register',async function(req,res){
    res.render('register')
})
router.get('/login',async function(req,res){
    res.render('login')
})

module.exports = router;
