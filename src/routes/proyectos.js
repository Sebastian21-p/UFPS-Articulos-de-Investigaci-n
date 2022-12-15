const express = require('express')
const router = express.Router()

const proyectoController = require('../controllers/proyectoController')

router.get('/RelPro', proyectoController.listProyectos)

router.post('/RegistrarProyecto', proyectoController.createProjects)

router.get('/registrar', proyectoController.formProyectos)


module.exports = router