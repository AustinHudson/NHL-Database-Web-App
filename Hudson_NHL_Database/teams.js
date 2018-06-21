module.exports = function(){
    var express = require('express');
    var router = express.Router();

        function getTeams(res, mysql, context, complete){
        mysql.pool.query(
            "SELECT team_id, team_name, division FROM NHL_teams ORDER BY division",
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }

     router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete_team.js"];
        var mysql = req.app.get('mysql');
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('teams', context);
            }

        }
    });

     router.post('/', function(req, res){
        console.log(req.body.team)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql ="INSERT INTO NHL_teams (team_name, division) VALUES (?, ?)";
        var inserts = [req.body.team_name, req.body.division];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/teams');
            }
        });
    });

    /* Route to delete a team, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:team_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM NHL_teams where team_id = ?";
        var inserts = [req.params.team_id];
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
