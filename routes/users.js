var express = require('express');
var router = express.Router();
const usersRepo = require('../repositories/users');

/* GET users listing. */
// router.get('/',async function(req, res, next) {
//   res.send(await usersRepo.getAllUsers());
// });

router.get('/',async function(req, res, next) {
  if(!req.query.page && !req.query.limit) {
    res.json(await usersRepo.getAllUsers());
  }
  else{
    res.json(await usersRepo.getUsers(parseInt(req.query.page), parseInt(req.query.limit)));
  }
});

router.get('/:id',async function(req, res, next) {
  res.json(await usersRepo.getUser(req.params.id));
});
router.get('/:id/articles',async function(req, res, next) {
  
  res.json(await usersRepo.getArticlesByUser(req.params.id));
});
router.post('/',async function(req, res, next) {
  var user = await usersRepo.addUser(req.body);
  if(user != "Utilisateur nouvellement créé") res.redirect('/auth/register')
  res.redirect('/')
});
router.post('/login',async function(req, res, next){
  console.log(req.body)
  var user = await usersRepo.autoriserLogin(req.body)
  if(user){
    req.session.userId = user.id
    res.redirect('/')
  } 
  else res.redirect('/auth/login') 
})
router.put('/',async function(req, res, next) {
  res.send(await usersRepo.updateUser(req.body));
});
router.delete('/',async function(req, res, next) {
  res.send(await usersRepo.deleteUser(req.body));
});
module.exports = router;
