const download = require('download');

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


function descargarExcel (req, res){ 
        req.getConnection((err, conn) =>{
        const {id} = req.params;
         conn.query(`SELECT * FROM articulo where id_articulo = ?`,[id] , (err, row) => {
            if(err){
                res.json(err);
            } else {   /*        
                        const xl = require('excel4node');
                        const wb = new xl.Workbook();
                        const ws = wb.addWorksheet(row[0].titulo);

                        row[0].id_articulo = row[0].id_articulo + "";
                        row[0].id_usuario = row[0].id_usuario + "";
                    
                        const headingColumnNames = [
                            "Id Articulo",
                            "Id Usuario",
                            "Titulo",
                            "Autores",
                            "Citaciones",
                            "Código Pais",
                            "Año",
                            "Palabras Clave",
                            "Url",
                            "Resumen",
                            "Conclusiones",
                            "Notas"
                        ]
                        //Write Column Title in Excel file
                        let headingColumnIndex = 1;
                        headingColumnNames.forEach(heading => {
                            ws.cell(1, headingColumnIndex++)
                                .string(heading)
                        });
                        //Write Data in Excel file
                        let rowIndex = 2;
                        row.forEach( record => {
                            let columnIndex = 1;
                            Object.keys(record ).forEach(columnName =>{
                                ws.cell(rowIndex,columnIndex++)
                                    .string(record [columnName])
                            });
                            rowIndex++;
                        }); 
                        wb.write(row[0].titulo+'.xlsx');  */    
                                       
                             console.log("llegué");
                             let i = 0; 
                             let path = row[0].titulo+'.xlsx'
                             console.log(path);   
                             res.download(path)                                                     
                             
            }
        })})
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
                const xl = require('excel4node');
                        const wb = new xl.Workbook();
                        const ws = wb.addWorksheet(row[0].titulo);

                        row[0].id_articulo = row[0].id_articulo + "";
                        row[0].id_usuario = row[0].id_usuario + "";
                    
                        const headingColumnNames = [
                            "Id Articulo",
                            "Id Usuario",
                            "Titulo",
                            "Autores",
                            "Citaciones",
                            "Código Pais",
                            "Año",
                            "Palabras Clave",
                            "Url",
                            "Resumen",
                            "Conclusiones",
                            "Notas"
                        ]
                        //Write Column Title in Excel file
                        let headingColumnIndex = 1;
                        headingColumnNames.forEach(heading => {
                            ws.cell(1, headingColumnIndex++)
                                .string(heading)
                        });
                        //Write Data in Excel file
                        let rowIndex = 2;
                        row.forEach( record => {
                            let columnIndex = 1;
                            Object.keys(record ).forEach(columnName =>{
                                ws.cell(rowIndex,columnIndex++)
                                    .string(record [columnName])
                            });
                            rowIndex++;
                        }); 
                        wb.write(row[0].titulo+'.xlsx');
                res.render('verArt', {data: row});
            }
        })})
}

function consultaEsp(req, res){
    const data = req.body
    req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM pais`, (err, row) => {
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
    //console.log(data);
    req.getConnection((err, conn) =>{
        conn.query(`SELECT * FROM articulo WHERE titulo = ?`, [data.titulo], (err, articulodata) => {
            if(articulodata.length > 0){
                res.render('registrarArticulos', {error: 'Error: Article already exists !'})
            } else{  
                            conn.query('INSERT INTO articulo SET ?', [data], (err, rows2) =>{
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
                            }})                        
            })
        }


module.exports = {
    descargarExcel,
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