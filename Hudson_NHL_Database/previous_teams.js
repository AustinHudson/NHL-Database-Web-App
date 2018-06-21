module.exports = function(){
    var express = require('express');
    var router = express.Router();

        function getPreviousTeams(res, mysql, context, complete){
        mysql.pool.query(
            "SELECT player_id, CONCAT(`first_name`, \" \", last_name) AS full_name, NHL_teams.team_id, NHL_teams.team_name FROM NHL_players " +
            "INNER JOIN player_previous_teams ON NHL_players.`player_id` = player_previous_teams.`pid` " +
            "INNER JOIN `NHL_teams` ON `player_previous_teams`.`tid` = `NHL_teams`.`team_id`",
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player_team = results;
            complete();
        });
    }
        function getTeams(res, mysql, context, complete){
        mysql.pool.query(
            "SELECT team_id, team_name  FROM NHL_teams",
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }

     function getPlayers(res, mysql, context, complete){
        mysql.pool.query(
            "SELECT player_id, CONCAT(`first_name`, \" \", last_name) AS full_name FROM NHL_players;",
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    function getPlayer(res, mysql, context, pid, tid, complete){
        var sql = "SELECT player_id, CONCAT(`first_name`, \" \", last_name) AS full_name, team_id, NHL_teams.team_name FROM NHL_players " +
                  "INNER JOIN player_previous_teams ON NHL_players.`player_id` = player_previous_teams.`pid` " +
                  "INNER JOIN `NHL_teams` ON `player_previous_teams`.`tid` = `NHL_teams`.`team_id` WHERE pid = ? AND tid = ?";
        var inserts = [pid, tid];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log(results)
            context.player = results[0];
            complete();
        });
    }

     router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete_previous_team.js"];
        var mysql = req.app.get('mysql');
        getPreviousTeams(res, mysql, context, complete);
        getTeams(res, mysql, context, complete);
        getPlayers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('previous_teams', context);
            }

        }
    });

     /* Display one person for the specific purpose of updating people */

    router.get('/pid/:player_id/tid/:team_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedTeam.js", "updatePreviousTeam.js"];
        var mysql = req.app.get('mysql');
        getPlayer(res, mysql, context, req.params.player_id, req.params.team_id, complete);
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update_previous_team', context);
            }

        }
    });

    /* The URI that update data is sent to in order to update a person */

    router.put('/pid/:player_id/tid/:team_id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.team_id)
        var sql = "UPDATE player_previous_teams SET tid = ? WHERE pid = ? AND tid = ?";
        var inserts = [req.body.previous_team, req.params.player_id, req.params.team_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql ="INSERT INTO player_previous_teams (pid, tid) VALUES (?, ?)"
        var inserts = [req.body.player, req.body.team];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/previous_teams');
            }
        });
    });

     /* Route to delete a previous team relationship, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/pid/:player_id/tid/:team_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM player_previous_teams WHERE pid = ? AND tid = ?";
        var inserts = [req.params.player_id, req.params.team_id];
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
