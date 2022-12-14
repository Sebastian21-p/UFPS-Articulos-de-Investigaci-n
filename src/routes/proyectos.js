const express = require('express')
const router = express.Router()

const proyectoController = require('../controllers/proyectoController')

router.get('/RelPro', proyectoController.listProyectos)

router.get('/verProyecto/:id', proyectoController.verProyectoEsp)

router.post('/RegistrarProyecto', proyectoController.createProjects)

router.get('/registrar', proyectoController.formProyectos)

router.post('/registrarPregunta/:id', proyectoController.formPregunta)

router.post('/delete/:id', proyectoController.eliminarProyecto)

router.post('/deletePregunta/:id', proyectoController.eliminarPregunta)




module.exports = router