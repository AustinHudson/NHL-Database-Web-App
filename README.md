# NHL-Database-Web-App

This project implements a web app which allows the user to 
view, add, delete, and update various entries in a database 
which is composed of NHL players, teams, positions, as well 
as players' home countries.

## Technology Used

* Node.js Server Side Environment
* MySQL/MariaDB Database Management System
* Express.js Web Framework
* Express-Handlebars Templating Engine
* Bootstrap Frontened Framework

## Getting Started

1. Set up a local MySQL server and update credentials in dbcon-TEMPLATE.js file. The file should be renamed to dbcon.js 
after the information from the MySQL server is entered. 

    * *Please note, MySQL must be installed on your local maching. [Here is information about downloading it](https://dev.mysql.com/downloads/)*

2. Queries to initialize the database can be found in the initialize_database.sql file 

3. Run 'npm install' in the directory where the package.json file is located. All of the necessary dependencies will be installed.

4. The app can now be started by running the command 'node main.js' + the port you want to run the app on.

   * For Example, running the command 'node main.js 3000' means that you can access the web app at http://localhost:3000

## Site Layout
There are viewable pages for Players, Teams, Positions, Countries, Player's Previous Teams, and a searchable Browse Players page.
Below are some screenshots of several of the pages.  
  #### Home Page
  ![Main Page](https://i.imgur.com/iTXwuLu.png)
  #### Players Page
  ![Players Page](https://i.imgur.com/HJ5VFVD.png)
  #### Team Page
  ![Team Page](https://i.imgur.com/qfKN7TV.png)

## Database Design
![ER](https://i.imgur.com/Z9XlnWo.png)
![Schema](https://i.imgur.com/xo8trsl.png)
