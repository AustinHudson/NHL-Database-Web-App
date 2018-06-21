module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getTeams(res, mysql, context, complete){
        mysql.pool.query("SELECT team_id, team_name FROM NHL_teams ORDER BY team_name   ", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team  = results;
            complete();
        });
    }

    function getCountries(res, mysql, context, complete){
        mysql.pool.query("SELECT country_id, country_name FROM NHL_country", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.country  = results;
            complete();
        });
    }

    function getPositions(res, mysql, context, complete){
        mysql.pool.query("SELECT position_id, CONCAT_WS(\" \", side, position_name) AS side_position_name FROM NHL_positions"
            , function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.position  = results;
            complete();
        });
    }

    function getPlayers(res, mysql, context, complete){
        mysql.pool.query(
            "SELECT NHL_players.player_id, NHL_players.`first_name`, `NHL_players`.`last_name`, `NHL_teams`.`team_name`," + 
            " `NHL_country`.`country_name`, CONCAT_WS(\" \", `NHL_positions`.`side`, `NHL_positions`.`position_name`)" + 
            " AS position FROM NHL_players" + 
            " LEFT JOIN NHL_teams ON `NHL_players`.team = NHL_teams.`team_id`" + 
            " LEFT JOIN `NHL_country` ON `NHL_players`.`home_country` = `NHL_country`.`country_id`" +
            " LEFT JOIN `NHL_positions` ON position = `NHL_positions`.`position_id` ORDER BY `NHL_teams`.`team_name` ASC", 
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    function getPlayer(res, mysql, context, id, complete){
        var sql = "SELECT player_id, first_name, last_name, team, home_country, position FROM NHL_players WHERE player_id = ?";
        var inserts = [id];
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

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete_player.js"];
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        getTeams(res, mysql, context, complete);
        getCountries(res, mysql, context, complete);
        getPositions(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('players', context);
            }

        }
    });

    /* Display one person for the specific purpose of updating people */

    router.get('/:player_id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedTeam.js", "selectedCountry.js", "selectedPosition.js", "updatePlayer.js"];
        var mysql = req.app.get('mysql');
        getPlayer(res, mysql, context, req.params.player_id, complete);
        getTeams(res, mysql, context, complete);
        getCountries(res, mysql, context, complete);
        getPositions(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('update_player', context);
            }

        }
    });

    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        console.log(req.body.team)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO NHL_players (first_name, last_name, team, home_country, position) " +
                  "VALUES (?, ?, ?, ?, ?)";
        var inserts = [req.body.fname, req.body.lname, req.body.team, req.body.country, req.body.position];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/players');
            }
        });
    });

    /* The URI that update data is sent to in order to update a person */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE NHL_players SET first_name= ?, last_name= ?, " +
                  "team = ?, home_country = ?, position = ? WHERE player_id= ?";
        var inserts = [req.body.fname, req.body.lname, req.body.team, req.body.country, req.body.position, req.params.id];
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

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:player_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM `NHL_players` WHERE player_id = ?";
        var inserts = [req.params.player_id];
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
