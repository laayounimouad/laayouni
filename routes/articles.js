var express = require('express')
var router = express.Router()
const articlesRepo = require('../repositories/articles')
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
    res.render('post', {article})
});
router.get('/new',async function(req, res, next) {
    res.render('create');
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
    // res.send(await articlesRepo.addArticle(req.body));
    // await articlesRepo.addArticle(req.body)
    console.log( await articlesRepo.addArticle(req.body));
    res.redirect('/')
});

router.put('/',async function(req, res, next) {
    res.send(await articlesRepo.updateArticle(req.body));
});
router.delete('/',async function(req, res, next) {
    res.send(await articlesRepo.deleteArticle(req.body));
  });
module.exports = router;