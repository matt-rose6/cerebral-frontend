var express = require('express')
var router = express.Router()

const entryController = require("../controllers/entryController")

router.get('/getEntries', entryController.getUserList);
router.get('/getEntry/:id', entryController.getUserById);
router.post('/addEntry', entryController.addUser);
router.put('/updateEntry/:id', entryController.updateUser);
router.delete('/deleteEntry/:id', entryController.deleteUser);

module.exports = router;