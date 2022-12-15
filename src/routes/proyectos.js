const express = require('express')
const router = express.Router()

const proyectoController = require('../controllers/proyectoController')

router.get('/RelPro', proyectoController.listProyectos)

router.post('/RegistrarProyecto', proyectoController.createProjects)

router.get('/registrar', proyectoController.formProyectos)

router.get('/preguntas/:id', proyectoController.verProyecto)

router.get('/registrarPregunta/:id', proyectoController.verProyecto)


module.exports = router