

function listArticulos(req, res){
    
    if(req.session.loggedin != true){
        res.render('index')
    } else {
        res.render('RelArt', {name: req.session.name, estado: req.session.estado})
    }
    
}

function listArticulosAdm(req, res){
    
    if(req.session.loggedin != true){
        res.render('index')
    } else {
        res.render('RelArt', {name: req.session.name, estado: req.session.estado})
    }
    
}

function formatoArticulo(req, res){
    
    if(req.session.loggedin != true){
        res.redirect('/')
    } else {
        console.log(req.session.id);
        res.render('registrarArticulos', {id: req.session.id})
    }
    
}

function registrarArticulo(req, res){
    
    const data = req.body
    req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM articulo WHERE titulo = ?`, [data.titulo], (err, articulodata) => {
            if(articulodata.length > 0){
                res.render('registrarArticulos', {error: 'Error: Article already exists !'})
            } else{                    
                    req.getConnection((err, conn) => {
                        conn.query(`INSERT INTO articulo SET ?`, [data], (err, rows) =>{
                            res.redirect('/RelArt')
                        })
                    })
            }
        })
    })

    
}

module.exports = {
    listArticulos,
    listArticulosAdm,
    formatoArticulo,
    registrarArticulo
}