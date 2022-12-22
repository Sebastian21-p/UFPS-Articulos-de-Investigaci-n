function verPreguntas(req, res){
    req.getConnection((err, conn) =>{
        const {id} = req.params;
        conn.query(`SELECT * FROM proyecto where id_proyecto = ?`,[id] , (err, row) => {
            if(err){
                res.json(err);
            } else {conn.query(`SELECT * FROM pregunta where id_proyecto = ?`,[id] , (err, row2) => {
                if(err){
                    res.json(err);
                } else {
                //console.log(row)
                res.render('preguntas', {data: row, data2: row2});
                }
            })
        }})})
}

function list(req, res){
    if(!req.session.loggedin){
        res.redirect('/')
    } else {                    
            res.render('RelPro')           
    }
}

function verArticulosDePregunta(req, res){
    req.getConnection((err, conn) =>{
        const {id} = req.params;
        //console.log(id);
        conn.query(`SELECT a.*, r.*, p.* FROM articulo a join revision r on r.id_articulo = a.id_articulo join pregunta p on p.id_pregunta = r.id_pregunta where r.id_pregunta = ?`,[id] , (err, row) => {
            if(err){
                res.json(err);
            } else {conn.query(`SELECT * FROM pregunta where id_pregunta = ?`,[id] , (err, row2) => {
                if(err){
                    res.json(err);
                } else {
                //console.log(row)
                //console.log(row2);
                res.render('articuloPreguntas', {data: row, data2: row2});
            }
        })
        }})})
}

function formRevision(req, res){
    const {id} = req.params;
    if(!req.session.loggedin){
        res.redirect('/')
    } else { 
        req.getConnection((err, conn) =>{
            conn.query(`SELECT * FROM articulo`, (err, row) => {
                if(err){
                    res.json(err);
                } else {
                    conn.query(`SELECT * FROM pregunta where id_pregunta = ?`,[id], (err, rows2) => {
                        if(err){
                            res.json(err);
                        } else {      
                    res.render('agregarArticuloAPregunta', {data: row, data2: rows2})           
                }
            })}
    })})
    }
}

function verRevision(req, res){
    const {id} = req.params;
    if(!req.session.loggedin){
        res.redirect('/')
    } else { 
        req.getConnection((err, conn) =>{
            conn.query(`SELECT * FROM revision where id_revision = ?`,[id], (err, row) => {
                if(err){
                    res.json(err);
                } else {
                    conn.query(`SELECT * FROM pregunta where id_pregunta = ?`,[id], (err, rows2) => {
                        if(err){
                            res.json(err);
                        } else {      
                    res.render('agregarArticuloAPregunta', {data: row, data2: rows2})           
                }
            })}
    })})
    }
}

function agregarRevision(req, res){
    const {id} = req.params;
    const data = req.body
    const fecha = new Date();
    if(!req.session.loggedin){
        res.redirect('/')
    } else {  req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM revision WHERE id_articulo = ?`, [data.id_articulo], (err, revisiondata) => {
            if(revisiondata.length > 0){
                res.render('preguntas', {error: 'Error: Articulo already exists !'})
            } else{var values = {
                                    id_pregunta: data.id_pregunta,
                                    id_articulo: data.id_articulo,
                                    aporte: data.aporte,
                                    fecha_creacion: fecha,
                                    notas: data.notas
                                }              
                                console.log(values);     
                                        conn.query(`INSERT INTO revision SET ?`, [values], (err, row) => {
                                            if(err){
                                                res.json(err);
                                            }
                                            else{
                                                res.redirect('/proyectos/RelPro');
                                            }
                                        })
                                    
                                } 
        })})
    }
}



module.exports = { 
    verRevision,
    formRevision,
    agregarRevision,
    verArticulosDePregunta, 
    list,  
    verPreguntas
}