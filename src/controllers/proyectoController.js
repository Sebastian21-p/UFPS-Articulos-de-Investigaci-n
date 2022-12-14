

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
                    res.json(row);
                    //res.render('RelPro', {data: row})
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