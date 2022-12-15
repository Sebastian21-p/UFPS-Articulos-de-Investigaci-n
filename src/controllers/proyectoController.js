

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
    data.id_usuario = req.session.id
    const fecha = new Date();
    //const hoy = fecha.getDate();
    data.fecha_creacion = fecha;
    //console.log(data);
    req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM proyecto WHERE titulo = ?`, [data.titulo], (err, proyectodata) => {
            if(proyectodata.length > 0){
                res.render('crearPro', {error: 'Error: Project already exists !'})
            } else{
                    conn.query("SELECT id_usuario FROM usuario where email = ?",[data.correo], (err, rows) =>{
                        if(err){
                            res.json(err);
                        }
                        else{
                                var values = {
                                    id_usuario: rows[0].id_usuario,
                                    titulo: data.titulo,
                                    objetivo: data.objetivo,
                                    notas: data.notas,
                                    fecha_inicio: data.fecha_inicio,
                                    fecha_fin: data.fecha_fin,
                                    fecha_creacion: data.fecha_creacion
                                }              
                                console.log(values);     
                                    
                                    req.getConnection((err, conn) =>{
                                        conn.query(`INSERT INTO proyecto SET ?`, [values], (err, row) => {
                                            if(err){
                                                res.json(err);
                                            }
                                            else{
                                                res.redirect('/proyectos/RelPro');
                                            }
                                        })
                                    })
                                }         
                    })
        }})
    })
}

function formProyectos(req, res){
    if(!req.session.loggedin){
        res.redirect('/')
    } else {       
                if(err){
                    res.json(err)
                } else{
                    res.render('crearPro')
                }            
    }
}

module.exports = {    
    listProyectos,
    createProjects,
    formProyectos
}