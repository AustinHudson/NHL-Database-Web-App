module.exports = function(){
    var express = require('express');
    var router = express.Router();

        function getPositions(res, mysql, context, complete){
        mysql.pool.query(
            "SELECT position_id, side, position_name FROM NHL_positions",
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.position = results;
            complete();
        });
    }

     router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete_position.js"];
        var mysql = req.app.get('mysql');
        getPositions(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('positions', context);
            }
        }
    });

    router.post('/', function(req, res){
        console.log(req.body.position)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql ="INSERT INTO NHL_positions (side, position_name) VALUES (?, ?)";
        var inserts = [req.body.side, req.body.position_name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/positions');
            }
        });
    });

     /* Route to delete a position, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:position_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM NHL_positions WHERE position_id = ?";
        var inserts = [req.params.position_id];
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
