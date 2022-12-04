const express = require('express');
const {engine} = require('express-handlebars')
const myconnection = require('express-myconnection')
const mysql = require('mysql')
const session = require('express-session')
const bodyParser = require('body-parser')


const loginRoutes = require('./routes/login')
const articulosRoutes = require('./routes/articulos')

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
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'gestion_de_art'
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

app.use(express.static(__dirname + '/public'));

app.get('/articulos', (req, res) =>{
    if(req.session.loggedin == true){
        if(req.session.estado == 1){
            res.render('RelArt', {id: req.session.id} )
        } else {
            res.render('RelArtU', {id: req.session.id} )
        }        
    } else {
        res.redirect('/login');
    }
})


app.get('/', (req, res) =>{
    if(req.session.loggedin == true){
        if(req.session.estado == 1){
            res.render('inicioAdm', {id: req.session.id}  )
        } else {
            res.render('inicio', {id: req.session.id}  )
        }
        
    } else {
        res.redirect('/login');
    }
})