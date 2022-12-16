

function listProyectos(req, res){
    
    if(!req.session.loggedin){
        res.render('index')
    } else {
        req.getConnection((err, conn) =>{
            conn.query(`SELECT * FROM proyecto`, (err, row) => {
                if(err){
                    res.json(err);
                } else {
                    //console.log(row);
                    //console.log(row[0].fecha_inicio.toString()) 
                    //console.log(ano[3]);
                    row.forEach(element => {
                        let ano = element.fecha_inicio.toString().split(" ")
                        element.ano = ano[3]
                        
                    });
                    //row[0].ano=ano[3]
                    //res.json(row);
                    //console.log(row);
                    res.render('RelPro', {data: row})
                }
            })})
    }
}

function createProjects(req, res){
    const data = req.body;
    data.id_usuario = req.session.id_user
    const fecha = new Date();
    data.fecha_creacion = fecha;   
    req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM proyecto WHERE titulo = ?`, [data.titulo], (err, proyectodata) => {
            if(proyectodata.length > 0){
                res.render('crearPro', {error: 'Error: Project already exists !'})
            } else{
                conn.query(`INSERT INTO proyecto SET ?`, [data], (err, row) => {
                if(err){
                   res.json(err);
                }
                else{
                   res.redirect('/proyectos/RelPro')
            }
        })}})
    })
}        

function formProyectos(req, res){
    if(!req.session.loggedin){
        res.redirect('/')
    } else {                    
                    res.render('crearPro')           
    }
}

function formPregunta(req, res){
    const {id} = req.params;
    const data = req.body
    if(!req.session.loggedin){
        res.redirect('/')
    } else {  req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM pregunta WHERE pregunta = ?`, [data.pregunta], (err, preguntadata) => {
            if(preguntadata.length > 0){
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
            
function eliminarProyecto(req, res){
    req.getConnection((err, conn) =>{
        const {id} = req.params;
        //console.log(id);
        conn.query(`DELETE FROM proyecto where id_proyecto = ?`, [id], (err, row) => {
            if(err){
                res.json(err);
            } else {
                //console.log("Borró !");
                res.redirect('/proyectos/RelPro');
            }
        })})
}

function eliminarPregunta(req, res){
    req.getConnection((err, conn) =>{
        const {id} = req.params;
        //console.log(id);
        conn.query(`DELETE FROM pregunta where id_pregunta = ?`, [id], (err, row) => {
            if(err){
                res.json(err);
            } else {
                //console.log("Borró !");
                res.redirect('/proyectos/RelPro');
            }
        })})
}

function verProyectoEsp(req, res){
    req.getConnection((err, conn) =>{
        const {id} = req.params;
        conn.query(`SELECT * FROM proyecto where id_proyecto = ?`,[id] , (err, row) => {
            if(err){
                    res.json(err);
                } else {
                //console.log(row)
                res.render('verProyecto', {data: row});
                }
            })
        })
    }



function verProyecto(req, res){
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



module.exports = {    
    listProyectos,
    createProjects,
    formProyectos,
    verProyecto,
    formPregunta, 
    eliminarProyecto,
    eliminarPregunta,
    verProyectoEsp
}