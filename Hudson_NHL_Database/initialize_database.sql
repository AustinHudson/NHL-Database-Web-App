# ************************************************************
# Data Definition Queries for NHL Database - CS340 Project
# By: Austin Hudson
#
# Please note, due to the time it would take, I have not included every
# player from every team into the database. One player from each of the 
# 31 teams has been added to the database. 
#
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: classmysql.engr.oregonstate.edu (MySQL 5.5.5-10.1.22-MariaDB)
# Database: cs340_hudsaust
# Generation Time: 2018-05-01 00:47:14 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table NHL_country
# ------------------------------------------------------------

CREATE TABLE `NHL_country` (
  `country_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_name` varchar(255) NOT NULL,
  `population` int(11) DEFAULT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `NHL_country` WRITE;
/*!40000 ALTER TABLE `NHL_country` DISABLE KEYS */;

INSERT INTO `NHL_country` (`country_id`, `country_name`, `population`)
VALUES
	(1,'Canada', 36290000),
	(2,'United States', 325700000),
	(3,'Sweden', 9903000),
	(4,'Finland', 5495000),
	(5,'Russia', 144300000),
	(6,'Czech Republic', 10560000);


/*!40000 ALTER TABLE `NHL_country` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table NHL_players
# ------------------------------------------------------------

CREATE TABLE `NHL_players` (
  `player_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `home_country` int(11),
  `position` int(11),
  `team` int(11),
  PRIMARY KEY (`player_id`),
  KEY `players_fk_1` (`home_country`),
  KEY `players_fk_2` (`position`),
  KEY `players_fk_3` (`team`),
  CONSTRAINT `players_fk_1` FOREIGN KEY (`home_country`) REFERENCES `NHL_country` (`country_id`)
  ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `players_fk_2` FOREIGN KEY (`position`) REFERENCES `NHL_positions` (`position_id`)
  ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `players_fk_3` FOREIGN KEY (`team`) REFERENCES `NHL_teams` (`team_id`)
  ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `NHL_players` WRITE;
/*!40000 ALTER TABLE `NHL_players` DISABLE KEYS */;

INSERT INTO `NHL_players` (`player_id`, `first_name`, `last_name`, `home_country`, `position`, `team`)
VALUES
	(1,'Patrice','Bergeron',1,1,1),
	(2,'Kyle','Okposo',2,3,2),
	(3,'Mike','Green',1,5,3),
	(4,'Colton','Sceviour',1,3,4),
	(5,'Carey','Price',1,6,5),
	(6,'Erik','Karlsson',3,5,6),
	(7,'Ryan','McDonagh',2,4,7),
	(8,'Leo','Komarov',3,5,8),
	(9,'Brandon','Saad',2,3,9),
	(10,'Gabriel','Landeskog',3,2,10),
	(11,'Jason','Spezza',1,1,11),
	(12,'Eric','Staal',1,1,12),
	(13,'P.K.','Subban',1,5,13),
	(14,'Beau','Bennett',2,3,14),
	(15,'Jan','Kostalek',6,5,15),
	(16,'Sebastian','Aho',4,2,16),
	(17,'Sergei','Bobrovsky',5,6,17),
	(18,'Andy','Greene',2,4,18),
	(19,'John','Tavares',1,1,19),
	(20,'Henrik','Lundqvist',3,6,20),
	(21,'Jakub','Voracek',6,3,21),
	(22,'Sidney','Crosby',1,1,22),
	(23,'Alex','Ovechkin',5,2,23),
	(24,'Ondrej','Kase',6,3,24),
	(25,'Antti','Raanta',4,6,25),
	(26,'Jony','Gaudreau',2,2,26),
	(27,'Connor','McDavid',1,1,27),
	(28,'Jeff','Carter',1,1,28),
	(29,'Justin','Braun',2,5,29),
	(30,'Jacob','Markstrom',3,6,30),
	(31,'Erik','Haula',4,1,31);

/*!40000 ALTER TABLE `NHL_players` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table NHL_positions
# ------------------------------------------------------------

CREATE TABLE `NHL_positions` (
  `position_id` int(11) NOT NULL AUTO_INCREMENT,
  `side` varchar(255) DEFAULT NULL,
  `position_name` varchar(255) NOT NULL,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `NHL_positions` WRITE;
/*!40000 ALTER TABLE `NHL_positions` DISABLE KEYS */;

INSERT INTO `NHL_positions` (`position_id`, `side`, `position_name`)
VALUES
	(1,NULL,'Center'),
	(2,'Left','Wing'),
	(3,'Right','Wing'),
	(4,'Left','Defenceman'),
	(5,'Right','Defenceman'),
	(6,NULL,'Goalie');

/*!40000 ALTER TABLE `NHL_positions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table NHL_teams
# ------------------------------------------------------------

CREATE TABLE `NHL_teams` (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_name` varchar(255) NOT NULL,
  `division` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `NHL_teams` WRITE;
/*!40000 ALTER TABLE `NHL_teams` DISABLE KEYS */;

INSERT INTO `NHL_teams` (`team_id`, `team_name`, `division`)
VALUES
	(1,'Boston Bruins','Atlantic'),
	(2,'Buffalo Sabres','Atlantic'),
	(3,'Detroit Red Wings','Atlantic'),
	(4,'Florida Panthers','Atlantic'),
	(5,'Montreal Canadiens','Atlantic'),
	(6,'Ottawa Senators','Atlantic'),
	(7,'Tampa Bay Lightning','Atlantic'),
	(8,'Toronto Maple Leafs','Atlantic'),
	(9,'Chicago Blackhawks','Central'),
	(10,'Colorado Avalanche','Central'),
	(11,'Dallas Stars','Central'),
	(12,'Minnesota Wild','Central'),
	(13,'Nashville Predators','Central'),
	(14,'St. Louis Blues','Central'),
	(15,'Winnipeg Jets','Central'),
	(16,'Carolina Hurricanes','Metropolitan'),
	(17,'Colombus Blue Jackets','Metropolitan'),
	(18,'New Jersey Devils','Metropolitan'),
	(19,'New York Islanders','Metropolitan'),
	(20,'New York Rangers','Metropolitan'),
	(21,'Philadelphia Flyers','Metropolitan'),
	(22,'Pittsburgh Penguins','Metropolitan'),
	(23,'Washington Capitals','Metropolitan'),
	(24,'Anaheim Ducks','Pacific'),
	(25,'Arizona Coyotes','Pacific'),
	(26,'Calgary Flames','Pacific'),
	(27,'Edmonton Oilers','Pacific'),
	(28,'Los Angeles Kings','Pacific'),
	(29,'San Jose Sharks','Pacific'),
	(30,'Vancouver Canucks','Pacific'),
	(31,'Vegas Golden Knights','Pacific');

/*!40000 ALTER TABLE `NHL_teams` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table player_previous_teams
# ------------------------------------------------------------

CREATE TABLE `player_previous_teams` (
  `pid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  KEY `ppt_fk_1` (`pid`),
  KEY `ppt_fk_2` (`tid`),
  CONSTRAINT `ppt_fk_1` FOREIGN KEY (`pid`) REFERENCES `NHL_players` (`player_id`) 
  ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ppt_fk_2` FOREIGN KEY (`tid`) REFERENCES `NHL_teams` (`team_id`)
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `player_previous_teams` WRITE;
/*!40000 ALTER TABLE `player_previous_teams` DISABLE KEYS */;

INSERT INTO `player_previous_teams` (`pid`, `tid`)
VALUES
	(2,19),
	(3,23),
	(4,11),
	(7,20),
	(9,17),
	(11,6),
	(12,16),
	(12,20),
	(13,5),
	(14,22),
	(14,18),
	(17,21),
	(21,17),
	(25,9),
	(25,20),
	(28,21),
	(28,17),
	(30,4),
	(31,12);

/*!40000 ALTER TABLE `player_previous_teams` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
