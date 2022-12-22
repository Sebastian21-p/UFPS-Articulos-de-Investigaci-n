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
            } else {
                console.log(row)
                res.render('articuloPreguntas', {data: row});
        }})})
}

function agregarRevision(req, res){
    const {id} = req.params;
    const data = req.body
    if(!req.session.loggedin){
        res.redirect('/')
    } else {  req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM revision WHERE id_articulo = ?`, [data.id_articulo], (err, revisiondata) => {
            if(revisiondata.length > 0){
                res.render('preguntas', {error: 'Error: Question already exists !'})
            } else{var values = {
                                    id_proyecto: id,
                                    pregunta: data.pregunta
                                }              
                                console.log(values);     
                                    
                                    req.getConnection((err, conn) =>{
                                        conn.query(`INSERT INTO pregunta SET ?`, [values], (err, row) => {
                                            if(err){
                                                res.json(err);
                                            }
                                            else{
                                                res.redirect('/proyectos/RelPro');
                                            }
                                        })
                                    })
                                } 
        })})
    }
}



module.exports = { 
    agregarRevision,
    verArticulosDePregunta, 
    list,  
    verPreguntas
}