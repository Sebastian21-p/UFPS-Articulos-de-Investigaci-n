const bcrypt = require('bcrypt')

function login(req, res){
    
    if(req.session.loggedin != true){
        res.render('index')
    } else {
        res.render('inicio', {name: req.session.name, estado: req.session.estado})
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
                        req.session.id_user = element.id_usuario
                        res.render('inicio',{name: req.session.nombre})
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
                var nodemailer = require('nodemailer')
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                    auth: {
                                        user: 'gestartufps@gmail.com',
                                        pass: 'uudkpttextokhppn'
                                    }
                            })

                            var msj = "Bienvenido " + data.nombre + " gracias por formar parte de nuestro equipo."
                            var mailOptions = {
                                from: 'gestartufps@gmail.com',
                                to: data.email,
                                subject: 'Bienvenid@ al Gestor de Artículos UFPS',
                                html: '<p>'+msj+'</p><br><img src="cid:Bienvenida" width="200">',
                                attachments: [
                                    {
                                        filename: 'Bienvenida.jpg',
                                        path: 'src/public/img/Bienvenida.jpg',
                                        cid: 'Bienvenida'
                                    }
                                ]
                                };

                            transporter.sendMail(mailOptions, function (error, info) {
                                //console.log(msg_str_altervpn_ini);
                                if (error) {
                                    console.log(error);
                                    //console.log(msg_str_mail_error + msg_str_mail_respu + error);
                                    //callback(true);
                                } else {
                                    console.log('Mensaje enviado xd' + info.response);
                                    //callback(false);
                                }
                               // console.log(msg_str_altervpn_fin);
                            });



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