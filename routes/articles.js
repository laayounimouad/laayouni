var express = require('express')
var router = express.Router()
const articlesRepo = require('../repositories/articles')

router.get('/',async function(req, res, next){
    if(!req.query.page && !req.query.limit) {
        res.json(await articlesRepo.getAllArticles());
      }
      else{
        res.json(await articlesRepo.getArticles(parseInt(req.query.page), parseInt(req.query.limit)));
      }
})

router.get('/:id',async function(req, res, next) {
    res.json(await articlesRepo.getArticle(req.params.id));
});

router.get('/:id/comments',async function(req, res, next) {
    res.json(await articlesRepo.getCommentsByArticleId(req.params.id));
});
router.get('/:id/tags',async function(req, res, next) {
    var temp = await articlesRepo.getTagsByArticleId(req.params.id)
    console.log(temp)
    res.json(temp);
});

router.post('/',async function(req, res, next) {
    res.send(await articlesRepo.addArticle(req.body));
});

router.put('/',async function(req, res, next) {
    res.send(await articlesRepo.updateArticle(req.body));
});
router.delete('/',async function(req, res, next) {
    res.send(await articlesRepo.deleteArticle(req.body));
  });
module.exports = router;