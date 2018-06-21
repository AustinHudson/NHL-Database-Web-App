module.exports = function(){
    var express = require('express');
    var router = express.Router();

        function getCountries(res, mysql, context, complete){
        mysql.pool.query(
            "SELECT country_id, country_name, population FROM NHL_country",
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.country = results;
            complete();
        });
    }

     router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete_country.js"];
        var mysql = req.app.get('mysql');
        getCountries(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('countries', context);
            }
        }
    });

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql ="INSERT INTO NHL_country (country_name, population) " +
                 "VALUES (?, ?)"
        var inserts = [req.body.country_name, req.body.population];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/countries');
            }
        });
    });

    /* Route to delete a team, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:country_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM NHL_country WHERE country_id = ?";
        var inserts = [req.params.country_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
