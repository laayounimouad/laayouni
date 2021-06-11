var express = require('express')
var router = express.Router()
const tagsRepo = require('../repositories/tags')

router.get('/',async function(req, res, next){
    if(!req.query.page && !req.query.limit) {
        res.json(await tagsRepo.getAllTags());
      }
      else{
        res.json(await tagsRepo.getTags(parseInt(req.query.page), parseInt(req.query.limit)));
      }
})

router.get('/:id',async function(req, res, next) {
    res.json(await tagsRepo.getTag(req.params.id));
});

router.get('/:id/articles',async function(req, res, next) {
    res.json(await tagsRepo.getArticlesByTagId(req.params.id));
});

router.post('/',async function(req, res, next) {
    res.send(await tagsRepo.addTag(req.body));
});

router.put('/',async function(req, res, next) {
    res.send(await tagsRepo.updateTag(req.body));
});
router.delete('/',async function(req, res, next) {
    res.send(await tagsRepo.deleteTag(req.body));
  });
module.exports = router;