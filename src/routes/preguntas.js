const express = require('express')
const router = express.Router()

const preguntaController = require('../controllers/preguntaController')

router.get('/:id', preguntaController.verPreguntas)

router.get('/verArticulos/:id', preguntaController.verArticulosDePregunta)

router.get('/agregarArticulo/:id', preguntaController.formRevision)

router.post('/agregarArticulo', preguntaController.agregarRevision)

router.get('/verRevision/:id', preguntaController.verRevision)


module.exports = router