const express = require('express');
const {engine} = require('express-handlebars')
const myconnection = require('express-myconnection')
const mysql = require('mysql')
const session = require('express-session')
const bodyParser = require('body-parser')


const loginRoutes = require('./routes/login')
const articulosRoutes = require('./routes/articulos')
const proyectosRoutes = require('./routes/proyectos')

const app = express()
app.set('port', 3000)

app.set('views', __dirname + '/views')
app.engine('.hbs', engine({
    extname: '.hbs',
}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(myconnection(mysql, {
    host: 'bkouwemwm45v2unu2xub-mysql.services.clever-cloud.com',
    user: 'uupiy1zohfk5nre4',
    password: 'Obr9b74iO9fbVFd15GYF',
    port: 3306,
    database: 'bkouwemwm45v2unu2xub'
}))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.listen(app.get('port'), () => {
    console.log('listening on port ', app.get('port'));
})

app.use(bodyParser.json())

app.use('/', loginRoutes)
app.use('/articulos', articulosRoutes)
app.use('/proyectos', proyectosRoutes)

app.use(express.static(__dirname + '/public'));

app.get('/articulos', (req, res) =>{
    if(req.session.loggedin == true){
        res.render('RelArt', {id: req.session.id} )
    } else {
        res.redirect('/login');
    }
})

app.get('/', (req, res) =>{
    if(req.session.loggedin == true){
        res.render('inicioAdm', {id: req.session.id}  )
    } else {
        res.redirect('/login');
    }
})

app.get('/proyectos', (req, res) =>{
    if(req.session.loggedin == true){        
        res.render('RelPro', {id: req.session.id}  )           
    } else {
        res.redirect('/login');
    }
})

