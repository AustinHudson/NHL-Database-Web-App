
module.exports = function(){
    var express = require('express');
    var router = express.Router();
    


        function getBrowsePlayers(res, mysql, context, searchParam, complete){
        mysql.pool.query(
            "SELECT player_id, first_name, last_name, `NHL_teams`.team_name " + 
            "FROM NHL_players INNER JOIN NHL_teams ON NHL_players.team = NHL_teams.team_id " +
            "WHERE last_name = ?", [searchParam],
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    function showAllPlayers(res, mysql, context, complete){
        mysql.pool.query(
            "SELECT player_id, first_name, last_name, `NHL_teams`.team_name " + 
            "FROM NHL_players INNER JOIN NHL_teams ON NHL_players.team = NHL_teams.team_id",
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

     router.get('/', function(req, res){
        var searchParam = req.query.lname
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js"];
        var mysql = req.app.get('mysql');
        if (searchParam){
            getBrowsePlayers(res, mysql, context, searchParam, complete);
        }
        else{
            showAllPlayers(res, mysql, context, complete);
        }

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('browse_players', context);
            }
        }
    });

     router.post('/', function(req, res){
        console.log(req.body.position)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql ="SELECT player_id, CONCAT(first_name, \" \", last_name) AS full_name, `NHL_teams`.team_name " + 
                 "FROM NHL_players INNER JOIN NHL_teams ON NHL_players.team = NHL_teams.team_id " +
                 "WHERE last_name = ?";
        var inserts = [req.body.search_lname];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/browse_players');
            }
        });
    });

    return router;
}();
