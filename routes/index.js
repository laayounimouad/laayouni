var router = require('express').Router();
const articlesRepo = require('../repositories/articles')
const userRepo = require('../repositories/users')
/* GET home page. */
router.get('/',async function(req, res, next) {
   var articles
   var temp = await articlesRepo.getArticles(1,10)
   articles = temp.results
   // articles = await articlesRepo.getAllArticles()
   for(var i = 0; i<articles.length;i++){
      articles[i].user=await userRepo.getUser(articles[i].UserId) ;
   }
   res.render('index',{articles});
});

module.exports = router;
