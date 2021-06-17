var router = require('express').Router();
const articlesRepo = require('../repositories/articles')
const userRepo = require('../repositories/users')
/* GET home page. */
router.get('/',async function(req, res, next) {
   var articles;
   // var temp = await articlesRepo.getArticles(1,10)
   // articles = temp.results

   // res.render('index',{articles});
   res.render('index');
});

module.exports = router;
