function getAll(req, res){
    req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM articulo`, (err, row) => {
            if(err){
                res.json(err);
            } else {
                res.json(row);
            }
        })})
}

function getPais(req, res){
    req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM pais`, (err, row) => {
            if(err){
                res.json(err);
            } else {
                res.json(row);
            }
        })})
}

function deleteById(req, res){
    req.getConnection((err, conn) =>{
        const {id} = req.params;
        console.log(id);
        conn.query(`DELETE FROM articulo where id_articulo = ?`, [id], (err, row) => {
            if(err){
                res.json(err);
            } else {
                //console.log("Borró !");
                res.redirect('/articulos/RelArt');
            }
        })})
}

function listArticulos(req, res){
    
    if(req.session.loggedin != true){
        res.render('index')
    } else {
        res.render('RelArt', {name: req.session.name})
    }
    
}

function listArticulosAdm(req, res){
    
    if(!req.session.loggedin){
        res.render('index')
    } else {
        req.getConnection((err, conn) =>{
            conn.query(`SELECT * FROM articulo`, (err, row) => {
                if(err){
                    res.json(err);
                } else {
                    //console.log(row);
                    res.render('RelArt', {data: row})
                }
            })})
    }
}

function formatoArticulo(req, res){
    if(!req.session.loggedin){
        res.redirect('/')
    } else {
        //console.log(req.session.id);
        req.getConnection((err, conn) =>{
            conn.query(`SELECT * FROM pais`, (err, row) => {
                if(err){
                    res.json(err)
                } else{
                    res.render('registrarArticulos', {data: row})
                }
            })})
    }
}

function verArticulo(req, res){
    req.getConnection((err, conn) =>{
        const {id} = req.params;
        conn.query(`SELECT * FROM articulo where id_articulo = ?`,[id] , (err, row) => {
            if(err){
                res.json(err);
            } else {
                console.log(row)
                res.render('verArt', {data: row});
            }
        })})
}

function consultaEsp(req, res){
    const data = req.body
    req.getConnection((err, conn) =>{
        //console.log(data.filtro);
        conn.query(`SELECT t1.*, t2.nombre from articulo as t1 join pais as t2 on t1.codigo_pais = t2.codigo_pais`, (err, row) => {
            if(err){
                res.json(err);
            } else {
                res.json(row);
            }
        })})
}

function filtrado(req, res){
    const data = req.body
    req.getConnection((err, conn) =>{
        //console.log(data.filtro);
        conn.query(`SELECT * FROM articulo where titulo LIKE '%${data.filtro}%'`, (err, row) => {
            if(err){
                res.json(err);
            } else {
                //console.log(row)
                res.render('RelArt', {data: row});
            }
        })})
}

function registrarArticulo(req, res){
    
    const data = req.body
    data.id_usuario = req.session.id_user
    console.log(data);
    req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM articulo WHERE titulo = ?`, [data.titulo], (err, articulodata) => {
            if(articulodata.length > 0){
                res.render('registrarArticulos', {error: 'Error: Article already exists !'})
            } else{  
                                var values = {
                                    id_usuario: rows[0].id_usuario,
                                    titulo: data.titulo,
                                    autores: data.autores,
                                    citacion: data.citacion,
                                    codigo_pais: data.codigo_pais,
                                    ano: data.ano,
                                    palabras_clave: data.palabrasClave,
                                    url: data.url,
                                    resumen: data.resumen,
                                    conclusiones: data.conclusiones,
                                    notas: data.notas
                                } 
                                console.log(values);
                            }
                            conn.query('INSERT INTO articulo SET ?', [values], (err, rows2) =>{
                                if (err) {
                                    res.json(err);
                                }
                                else {
                                    //console.log(rows2);
                                    res.redirect('/articulos/RelArt')
                                }
                            })
                                /*conn.query('INSERT INTO articulo (usuario_id,titulo,autores,citacion,pais,ano,palabras_clave,url,resumen,conclusiones,notas) values ("'+rows[0].id+'","'+data.titulo+'","'+data.autores+'","'+data.citacion+'","'+data.pais+'","'+data.ano+'","'+data.palabrasClave+'","'+data.url+'","'+data.resumen+'","'+data.conclusiones+'","'+data.notas+'")', (err, rows) =>{                                   
                                    
                                    res.redirect('/articulos')
                                })*/
                        })                        
            })
        }
        

module.exports = {
    listArticulos,
    listArticulosAdm,
    formatoArticulo,
    registrarArticulo,
    verArticulo,
    getAll,
    deleteById, 
    filtrado,
    consultaEsp,
    getPais
}