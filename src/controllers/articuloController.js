

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
    console.log(data);
    req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM articulo WHERE titulo = ?`, [data.titulo], (err, articulodata) => {
            if(articulodata.length > 0){
                res.render('registrarArticulos', {error: 'Error: Article already exists !'})
            } else{                   
                    
                        conn.query("SELECT id FROM usuario where email = ?",[data.correo], (err, rows) =>{
                            console.log(rows);
                            var values = {
                                usuario_id: rows[0].id,
                                titulo: data.titulo,
                                autores: data.autores,
                                citacion: data.citacion,
                                pais: data.pais,
                                ano: data.ano,
                                palabras_clave: data.palabrasClave,
                                url: data.url,
                                resumen: data.resumen,
                                conclusiones: data.conclusiones,
                                notas: data.notas
                            } 
                            console.log(values);
                            /*conn.query('INSERT INTO articulo SET ?', [values], (err, rows2) =>{
                                console.log(rows2);
                                res.redirect('/articulos')
                            })*/
                            
                                conn.query('INSERT INTO articulo (usuario_id,titulo,autores,citacion,pais,ano,palabras_clave,url,resumen,conclusiones,notas) values ("'+rows[0].id+'","'+data.titulo+'","'+data.autores+'","'+data.citacion+'","'+data.pais+'","'+data.ano+'","'+data.palabrasClave+'","'+data.url+'","'+data.resumen+'","'+data.conclusiones+'","'+data.notas+'")', (err, rows) =>{
                                    
                                    res.redirect('/articulos')
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