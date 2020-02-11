var express = require('express');
var router = express.Router();

const sql = require('mssql');
/* GET users listing. */
const config = {
    user: '4dd_20',  //Vostro user name
    password: 'xxx123##', //Vostra password
    server: "213.140.22.237",  //Stringa di connessione
    database: '4dd_20', //(Nome del DB)
}
let executeQuery = function (res,query, next, pageName) {
    sql.connect(config, function (err) {
      if (err) { //Display error page
        console.log("Error while connecting database :- " + err);
        res.status(500).json({success: false, message:'Error while connecting database', error:err});
        return "err";
      }
      var request = new sql.Request(); // create Request object
      request.query(query, function (err, result) { //Display error page
        if (err) {
          console.log("Error while querying database :- " + err);
          res.status(500).json({success: false, message:'Error while querying database', error:err});
          sql.close();
          return "err";
        }
        //sql.close();
        render(pageName, result.recordset, res) //Il vettore con i dati è nel campo recordset (puoi loggare result per verificare)
      });
    });
  }

let render = function(pageName, data, res)
{
  res.render(pageName, {data : data})
}
router.get('/all', function(req, res, next) {
    executeQuery(res,"select * from [dbo].[cr-unit-attributes]", next, "all_unit");
});

module.exports = router;
