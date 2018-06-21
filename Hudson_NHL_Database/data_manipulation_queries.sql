--
-- List/Add/update/delete player page
--
-- Please note: None of the 1 to many relationships can be deleted
-- so an error message will need to be displayed to the user when 
-- clicking on the 'Remove Home Country' button as discussed in:
-- https://piazza.com/class/jfeeua298i24a?cid=195

-- get team ids and names to populate dropdown menu 
SELECT team_id, team_name FROM NHL_teams;

-- get country ids and names to populate dropdown menu 
SELECT country_id, country_name FROM NHL_country;

-- get position names and sides for dropdown menus
SELECT position_id, CONCAT_WS(" ", side, position_name) FROM NHL_positions;

-- add a new player 
INSERT INTO NHL_players (first_name, last_name, home_country, position, team) 
VALUES ([first_name_input], [last_name_input], [home_country_selection], 
		[position_selection], [team_selection]);

-- Display First Name, Last Name, Team, Home Country, and Position of players
SELECT NHL_players.`first_name`, `NHL_players`.`last_name`, `NHL_teams`.`team_name`, `NHL_country`.`country_name`, 
CONCAT_WS(" ", `NHL_positions`.`side`, `NHL_positions`.`position_name`) AS position FROM NHL_players 
INNER JOIN NHL_teams ON `NHL_players`.team = NHL_teams.`team_id`
INNER JOIN `NHL_country` ON `NHL_players`.`home_country` = `NHL_country`.`country_id`
INNER JOIN `NHL_positions` ON position = `NHL_positions`.`position_id`
ORDER BY `NHL_teams`.`team_name` ASC;

-- delete a player
DELETE FROM `NHL_players` WHERE player_id = [player_ID_selected_from_players_page];

-- Update a player's data based on submission of update player form
UPDATE `NHL_players` SET `first_name`=[first_name_input], last_name=[last_name_input],
`team`=[dropdown_team_input], `home_country`=[dropdown_country_input], position=[dropdown_position_input] 
WHERE player_id=[player_id_input];

	
-- 
-- List/add/update/delete team page
-- 

-- add a new team
INSERT INTO NHL_teams (team_name, division) VALUES ([team_name_input], [division_input]);

-- display team name and division
SELECT team_id, team_name, division FROM NHL_teams;

-- delete a team
DELETE FROM NHL_teams where team_id=[team_id_of_team_to_delete];


--
-- List/add/update/delete positions page
--

-- get sides from dropdown menu
SELECT DISTINCT side FROM NHL_positions;

-- Add a new position
INSERT INTO NHL_positions (`position_name`, side) VALUES ([position_name_input], [side_dropdown_input]);

-- display position side and name
SELECT side, position_name FROM NHL_positions;

-- Delete a position
DELETE FROM NHL_positions WHERE position_id = [position_id_to_delete];


--
--	List/add/update/delete countries
--

-- Add a new country
INSERT INTO NHL_country (country_name, population)
VALUES ([country_name_input], [population_input]);

-- display the country name and population
SELECT country_name, population FROM NHL_country;

-- Delete a country
DELETE FROM NHL_country WHERE `country_id` = [country_id_to_delete];


--
-- Associate/update/disassociate a player and previous teams
--

-- display player and their previous teams
SELECT player_id, CONCAT(`first_name`, \" \", last_name) AS full_name, team_id, NHL_teams.team_name FROM NHL_players 
INNER JOIN player_previous_teams ON NHL_players.`player_id` = player_previous_teams.`pid` 
INNER JOIN `NHL_teams` ON `player_previous_teams`.`tid` = `NHL_teams`.`team_id` WHERE pid = ? AND tid = ?

-- get team ids and names for dropdown menu
SELECT team_id, team_name  FROM NHL_teams;

-- get player names for dropdown menu
SELECT player_id, CONCAT(`first_name`, " ", last_name) AS full_name
FROM NHL_players;

-- add an association between a player and their former team
INSERT INTO player_previous_teams (pid, tid) VALUES ([dropdown_player_id],
[dropdown_team_id]);

-- update an association between a player and their former team
UPDATE player_previous_teams SET tid = [teamid_dropdown] WHERE pid = [player_id_to_update] AND tid = [team_id_being_updated]

-- remove an association between a player and their previous team
DELETE FROM player_previous_teams WHERE pid = [player_id_to_delete] AND
tid = [team_id_to_delete]


--
-- Browse Players Page
--

-- Display Players Names and Teams
SELECT player_id, CONCAT(`first_name`, " ", last_name) AS full_name, `NHL_teams`.team_name  
FROM NHL_players INNER JOIN NHL_teams ON NHL_players.team = NHL_teams.team_id;

-- Display search results of players last name 
SELECT player_id, CONCAT(`first_name`, " ", last_name) AS full_name, `NHL_teams`.team_name  
FROM NHL_players INNER JOIN NHL_teams ON NHL_players.team = NHL_teams.team_id
WHERE last_name = [search_box_input];
 



