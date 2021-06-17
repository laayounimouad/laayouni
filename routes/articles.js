var express = require('express')
var router = express.Router()
const articlesRepo = require('../repositories/articles')
const userRepo = require('../repositories/users')
const auth = require('../middleware/auth')
const {Tag} = require('../models')
router.use(express.static('public'));

router.get('/',async function(req, res, next){
    var articles ;
    if(!req.query.page && !req.query.limit) {
        articles =await articlesRepo.getAllArticles()
        res.json(articles);
      }
    else{
          articles =await articlesRepo.getArticles(parseInt(req.query.page), parseInt(req.query.limit));
        res.json(articles);
      }
    
})

router.get('/:id(\\d+)',async function(req, res, next) {
    var article = await articlesRepo.getArticle(req.params.id);
    var user = await userRepo.getUser(article.UserId)
    tags=await articlesRepo.getTagsByArticleId(article.id)
    res.render('post', {article,user,tags})
});
router.get('/new',auth.createAuth,async function(req, res, next) {
        var userId = req.session.userId
        var tags =await Tag.findAll();
        res.render('create',{userId,tags});
});

router.get('/:id/comments',async function(req, res, next) {
    res.json(await articlesRepo.getCommentsByArticleId(req.params.id));
});
router.get('/:id/tags',async function(req, res, next) {
    res.json(await articlesRepo.getTagsByArticleId(req.params.id));
});
// associate Article And Tag
router.post('/:idArticle/tags/:idTag',async function(req, res, next) {
    res.json(await articlesRepo.associateArticleAndTag(req.params.idArticle,req.params.idTag));
});
router.post('/',async function(req, res, next) {
     await articlesRepo.addArticle(req.body);
    res.redirect('/')
});

router.put('/',async function(req, res, next) {
    res.send(await articlesRepo.updateArticle(req.body));
});
router.delete('/',async function(req, res, next) {
    res.send(await articlesRepo.deleteArticle(req.body));
  });
module.exports = router;