var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var sql = require("mssql");
var config = {
    user: 'test',
    password: '1111',
    server: 'localhost',
    database: 'intra_finance'
};
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.get('/', function (req, res) {

    // connection to my database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        //  
        var request = new sql.Request();
        //  
        request.query('EXEC SelectAllMonth ',
            function (err, recordset) {
                if (err) console.log(err)
                //  
                res.send(recordset);
            });
    });
    /* sql.close(); */
});


app.post('/newMonth', function (req, res) {
    var data = JSON.parse(req.body.data);
    var Id_mois = data.Id_mois;
    var feecommunication = data.feecommunication;
    var feeloyer = data.feeloyer;
    var budget = data.budget;
    var feedivers = data.feedivers;
    var feenourriture = data.feenourriture;
    var feetaxes = data.feetaxes;
    var feetransport = data.feetransport;
    var year =  data.Id_year;
    // var date = data.date;
    sql.connect(config, function () {
        var query = "insert into month_bill (id_mois,budget,taxes,loyer,nourriture,transport,communication,divers,annee) values ('" + Id_mois + "','" + budget + "','" + feetaxes + "','" + feeloyer + "','" + feenourriture + "','" + feetransport + "','" + feecommunication + "','" + feedivers + "','" + year + "' )";
        sql.query(query, function (err, result, field) {
            if (err) {
                res.end(JSON.stringify(err));
            }
            else {
                if (result.affectedRows > 0) {
                    res.end("successfully inserted")
                }
                else {
                    res.end("Please try again")
                }
            }
        })

        /*         var b = 5;
                var query2 = "insert into loyer (id_loyer,depense) values ('" +Id_loyer + "','" + b + "')";
        
                sql.query(query2, function (err, result, field) {
                    if (err) {
                        res.end(JSON.stringify(err));
                    }
                    else {
                        if (result.affectedRows > 0) {
                            res.end("successfully inserted")
                        }
                        else {
                            res.end("Please try again")
                        }
                    }
                })
        
                var query3 = "insert into divers (id_divers,depense) values ('" + Id_divers + "','" + b + "')";
        
                sql.query(query3, function (err, result, field) {
                    if (err) {
                        res.end(JSON.stringify(err));
                    }
                    else {
                        if (result.affectedRows > 0) {
                            res.end("successfully inserted")
                        }
                        else {
                            res.end("Please try again")
                        }
                    }
                })
        
                var query4 = "insert into comm (id_communication,depense) values ('" + Id_communication + "','" + b + "')";
        
                sql.query(query4, function (err, result, field) {
                    if (err) {
                        res.end(JSON.stringify(err));
                    }
                    else {
                        if (result.affectedRows > 0) {
                            res.end("successfully inserted")
                        }
                        else {
                            res.end("Please try again")
                        }
                    }
                })
        
        
                var query5 = "insert into taxes (id_taxes,depense) values ('" + Id_taxes + "','" + b + "')";
        
                sql.query(query5, function (err, result, field) {
                    if (err) {
                        res.end(JSON.stringify(err));
                    }
                    else {
                        if (result.affectedRows > 0) {
                            res.end("successfully inserted")
                        }
                        else {
                            res.end("Please try again")
                        }
                    }
                })
        
                
                var query6 = "insert into food (id_food,depense) values ('" + Id_nourriture + "','" + b + "')";
        
                sql.query(query6, function (err, result, field) {
                    if (err) {
                        res.end(JSON.stringify(err));
                    }
                    else {
                        if (result.affectedRows > 0) {
                            res.end("successfully inserted")
                        }
                        else {
                            res.end("Please try again")
                        }
                    }
                })
        
         */

    })
})





/* app.post("/insertuser", function(req , res){
    insertEmployees()
});
function insertEmployees() {

    var dbConn = new sql.Connection(config);
    dbConn.connect().then(function () {
        var transaction = new sql.Transaction(dbConn);
        transaction.begin().then(function () {
            var request = new sql.Request(transaction);
            request.query("INSERT INTO tblstudent (id,name) VALUES ('1',hello')")
            .then(function 	() {
                transaction.commit().then(function (resp) {
                    console.log(resp);
                    dbConn.close();
                }).catch(function (err) {
                    console.log("Error in Transaction Commit " + err);
                    dbConn.close();
                });
            }).catch(function (err) {
                console.log("Error in Transaction Begin " + err);
                dbConn.close();
            })
        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        }).catch(function (err) {
        //12.
        console.log(err);
    });
  });
} */


var server = app.listen(3300, function () {
    console.log('My Server is running..');
});
