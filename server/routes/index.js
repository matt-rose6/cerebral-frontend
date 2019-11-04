
var express = require('express')
var router = express.Router()
const users = require("./users")
const restaurants = require("./restaurants")
const preferences = require("./preferences")

router.use('/users', users)
router.use('/restaurants', restaurants)
router.use('/preferences', preferences)

module.exports = router;

