const express = require('express')
const router = express.Router()

const articuloController = require('../controllers/articuloController')



router.get('/RelArt', articuloController.listArticulosAdm)

router.get('/RelArtU', articuloController.listArticulos)

router.get('/registrar', articuloController.formatoArticulo)

router.post('/registrar', articuloController.registrarArticulo)

router.get('/verArt/:id', articuloController.verArticulo)

router.get('/verArt/Excel/:id', articuloController.descargarExcel)

router.get('/registros', articuloController.getAll)

router.post('/delete/:id', articuloController.deleteById)

router.post('/RelArtF', articuloController.filtrado)

router.get('/consultaEsp', articuloController.consultaEsp)

router.get('/getPais', articuloController.getPais)

router.get('/editarArticulo/:id', articuloController.formEditarArticulo)

router.post('/editarArticulo', articuloController.editarArticulo)

module.exports = router