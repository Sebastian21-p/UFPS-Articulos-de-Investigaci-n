const bcrypt = require('bcrypt')

function login(req, res){
    if(req.session.nombre){
        console.log('si ' + req.session.nombre);
    }
    else {
        console.log('no');
    }
    
    if(req.session.loggedin != true){
        res.render('index')
    } else {
        res.render('inicio', {name: req.session.name})
    }
    
}





function auth(req, res){
    const data = req.body
    
    req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM usuario WHERE email = ?`, [data.email], (err, userdata) => {
            if(userdata.length > 0){
                userdata.forEach(element => {            
                bcrypt.compare(data.password, element.password, (err, isMatch) =>{
                    if(!isMatch){
                        res.render('index', {error: 'Error: incorrect password !'})
                    } else {
                        req.session.loggedin = true
                        req.session.nombre = element.nombre
                        res.redirect('/')
                    }
                 });
                })

            } else{
                res.render('index', {error: 'Error: user already exists !'})
            }
        })
    })
}

function register(req, res){
    if(req.session.loggedin != true){
        res.render('registro')
    } else {
        res.redirect('inicio');
    }
}

function storeUser(req,res){
    const data = req.body
    req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM usuario WHERE email = ?`, [data.email], (err, userdata) => {
            if(userdata.length > 0){
                res.render('registro', {error: 'Error: user already exists !'})
            } else{
                bcrypt.hash(data.password, 12).then(hash => {
                    data.password = hash
                    
                    req.getConnection((err, conn) => {
                        conn.query(`INSERT INTO usuario SET ?`, [data], (err, rows) =>{
                            res.redirect('/login')
                        })
                    })
                })
            }
        })
    })

    
}

function logout(req, res) {
    if(req.session.loggedin == true){
        req.session.destroy()        
    }
    res.redirect('/login')
}

module.exports = {
    login,
    register,
    storeUser,
    auth,
    logout
}