const express = require('express')
const router = express.Router()

const articuloController = require('../controllers/articuloController')



router.get('/RelArt', articuloController.listArticulosAdm)

router.get('/RelArtU', articuloController.listArticulos)

router.get('/registrar', articuloController.formatoArticulo)

router.post('/registrar', articuloController.registrarArticulo)



module.exports = router