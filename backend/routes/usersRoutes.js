const express = require('express')
const router = express.Router()

const {loginUser, regiserUser, getMe} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')
router.post('/login', loginUser)
router.post('/', regiserUser)
router.get('/me', protect, getMe)

module.exports = router