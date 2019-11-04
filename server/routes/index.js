
var express = require('express')
var router = express.Router()
const users = require("./users")
const entries = require("./entries")
const emotions = require("./emotions")

router.use('/users', users)
router.use('/entries', entries)
router.use('/emotions', emotions)

module.exports = router;

