var express = require('express');
var router = express.Router();
const usersRepo = require('../repositories/users');

/* GET users list. */
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

router.get('/:id(\\d+)',async function(req, res, next) {
  res.json(await usersRepo.getUser(req.params.id));
});
router.get('/:id/articles',async function(req, res, next) {
  
  res.json(await usersRepo.getArticlesByUser(req.params.id));
});

router.post('/',async function(req, res, next) {
  var response = await usersRepo.addUser(req.body)
  if(response.message == "Utilisateur nouvellement créé") res.status(200).json({user:response.user})
  else res.status(400).json(response)
});

router.post('/login',async function(req, res, next){
  var user = await usersRepo.autoriserLogin(req.body)
  if(user){
    res.status(200).json({
                          id:user.id,
                          username : user.username,
                          role : user.role
                        })
  } 
  else res.status(400).json({message:"Email or password incorrect"}) 
})
router.put('/',async function(req, res, next) {
  res.send(await usersRepo.updateUser(req.body));
});
router.delete('/',async function(req, res, next) {
  res.send(await usersRepo.deleteUser(req.body));
});
module.exports = router;
