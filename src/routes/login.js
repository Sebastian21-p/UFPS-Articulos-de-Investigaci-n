const express = require('express')
const loginController = require('../controllers/loginController')

const router = express.Router()

router.get('/login', loginController.login)

router.post('/inicio', loginController.auth)

router.get('/registro', loginController.register)

router.post('/registro', loginController.storeUser)

router.get('/inicio', loginController.login)

router.get('/logout', loginController.logout)


module.exports = router