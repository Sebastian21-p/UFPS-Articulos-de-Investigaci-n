const express = require('express')
const router = express.Router()

const preguntaController = require('../controllers/preguntaController')

router.get('/:id', preguntaController.verPreguntas)


module.exports = router