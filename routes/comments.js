var express = require('express')
var router = express.Router()
const commentsRepo = require('../repositories/comments')

router.get('/',async function(req, res, next){
    if(!req.query.page && !req.query.limit) {
        
        res.json(await commentsRepo.getAllComments());
      }
      else{
        res.json(await commentsRepo.getComments(parseInt(req.query.page), parseInt(req.query.limit)));
      }
})

router.get('/:id',async function(req, res, next) {
    
    res.json(await commentsRepo.getComment(req.params.id));
});

router.post('/',async function(req, res, next) {
    res.send(await commentsRepo.addComment(req.body));
});

router.put('/',async function(req, res, next) {
    res.send(await commentsRepo.updateComment(req.body));
});
router.delete('/',async function(req, res, next) {
    res.send(await commentsRepo.deleteComment(req.body));
  });
module.exports = router;