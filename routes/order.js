const express = require('express')
const router = express.Router()
const controller = require('../controllers/order')


router.get('/login', controller.getAll)
router.post('/register', controller.create)

module.exports = router