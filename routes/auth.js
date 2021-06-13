var express = require('express');
var router = express.Router();
const logoutController = require('../controllers/logout')
const redirectIfAuthenticated = require('../middleware/redirectIfAuthenticated');
router.use(express.static('public'));
router.get('/register',redirectIfAuthenticated,async function(req,res){
    res.render('register')
})
router.get('/login',redirectIfAuthenticated,async function(req,res){
    res.render('login')
})
router.get('/logout',(req, res) => {
    console.log("yes")
    req.session.destroy(() => {
        console.log("yes")
        res.redirect('/')
        console.log("yes")
    })
})

module.exports = router;
