var express = require('express')
var router = express.Router()
var tagsRouter = require('./tags');
router.use('/tags',tagsRouter)
module.exports = router