const express = require('express');
const {engine} = require('express-handlebars')
const myconnection = require('express-myconnection')
const mysql = require('mysql')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const loginRoutes = require('./routes/login')

const app = express()
app.set('port', 3000)

app.set('views', __dirname + '/views')
app.engine('.ejs', engine({
    extname: '.ejs',
}))
app.set('view engine', 'ejs')

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

app.use('/', loginRoutes)

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
    if(req.session.loggedin == true){
        res.render('inicio', {name: req.session.name}  )
    } else {
        res.redirect('/login');
    }
})