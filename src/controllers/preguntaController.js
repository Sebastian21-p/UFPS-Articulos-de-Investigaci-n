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
        console.log(id);
        conn.query(`SELECT a.titulo, a.autores FROM articulo a join revision r on r.id_articulo = a.id_articulo join pregunta p on p.id_pregunta = r.id_pregunta where r.id_pregunta = ?`,[id] , (err, row) => {
            if(err){
                res.json(err);
            } else {
                console.log(row)
                res.render('articuloPreguntas', {data: row});
        }})})
}



module.exports = { 
    verArticulosDePregunta, 
    list,  
    verPreguntas
}