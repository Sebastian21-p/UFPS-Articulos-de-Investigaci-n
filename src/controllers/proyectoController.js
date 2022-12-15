

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
                    console.log(row);
                    res.render('RelPro', {data: row})
                }
            })})
    }
}

function createProjects(req, res){
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query(`INSERT INTO proyecto SET ?`, [data], (err, row) => {
            if(err){
                res.json(err);
            }
            else{
                res.json(row);
            }
        })})
}

module.exports = {    
    listProyectos,
    createProjects
}