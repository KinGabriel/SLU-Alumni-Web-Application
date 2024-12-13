# SLU-Alumni-Web-Application
### :man_technologist: Meet the team
- Caparas, Joaquin Gabriel
- Cariño, Mark Lorenz
- Escaño, Nichole Jhoy
- Razo, Ma. Lourdes Shaine
- Vergara, Carlos Miguel

- SLU Alumina Website (Environment and Project Set up)

This project is a web application designed to manage alumni records, events, job opportunities, and user accounts. It is built using a combination of PHP, MySQL (WAMP server), and Node.js for additional functionalities.

Prerequisites  
1. WAMP Server: Install WAMP server for hosting the PHP and MySQL backend. You can download it from [https://www.wampserver.com/](https://www.wampserver.com/).  
2. Node.js: Install Node.js from [https://nodejs.org/](https://nodejs.org/).  

Project Setup  

 Step 1: Setting up WAMP Server  
1. Install and start the WAMP server.  
2. Place the project folder inside the www directory of your WAMP installation (e.g., C:\wamp64\www\i).  
3. Open PHPMyAdmin (http://localhost/phpmyadmin) and create a database for the project (e.g., slu_alumina).  
4. Import the provided SQL file to set up the database schema and initial data. You can find this file in database/slu_alumina.sql.  

Step 2: Setting up Node.js  
1. Open a terminal or command prompt.  
2. Navigate to the Node.js part of the project:  

   cd alumni  

3. Run the following command to install the required dependencies:  

   npm install  

Step 3: Running the Project  
1. From the root directory, start the Node.js server:  

   node alumni/index.js  

2. Access the PHP application by visiting http://localhost/SLU-Alumni-Web-Application in your web browser.  

Notes  
- Ensure both WAMP Server and Node.js are running simultaneously.  
- The PHP application handles the frontend and backend, while the Node.js server manages additional functionalities like real-time notifications.
