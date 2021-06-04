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
router.post('/',async function(req, res, next) {
  res.send(await usersRepo.addUser(req.body));
});
router.put('/',async function(req, res, next) {
  res.send(await usersRepo.updateUser(req.body));
});
router.delete('/',async function(req, res, next) {
  res.send(await usersRepo.deleteUser(req.body));
});
module.exports = router;
