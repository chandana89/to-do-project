Follow the steps below to set up and run the application.

Prerequisites
Ensure you have the following installed on your machine:

Node.js: Download Node.js.
MySQL: You can set up and run MySQL using one of the following options:
Install MySQL directly: Download MySQL
Use XAMPP, which includes MySQL: Download XAMPP.
Setup Instructions
Clone the Repository

Clone this repository to your local machine using:

git clone https://github.com/chandana89/to-do-project.git
Create Environment Configuration

Navigate to the server directory and create a .env file

Open the .env file and add the following configuration:

 # Environment configuration file

 # Application environment
 NODE_ENV=development            # The environment in which the application is running (development, production, test)

 # Port configuration
 SERVER_PORT=3000                # Port number for the Express server (HTTP server)

 # MySQL database configuration
 MYSQL_HOST=localhost            # Hostname for the MySQL database server
 MYSQL_USER='root'               # Username for the MySQL database
 MYSQL_PASSWORD=''               # Password for the MySQL database (empty for development)
 MYSQL_DATABASE='wsu_wpmis_db'   # Name of the MySQL database
 MYSQL_PORT=3306                 # Port number for the MySQL database server

Run SQL Scripts to Set Up the Database

Locate the schema.sql script under server/database and run it to create the necessary tables.
Locate the insert.sql script under server/database and run it to insert the test data.

Installing and Running the Application
Open two terminals and follow these steps:

Set Up the Frontend:

cd client
npm install
npm run dev

Set Up the Backend:

cd server
npm install
npm run dev

By following these steps, you should have the application up and running on your local machine. If you have any questions or need further assistance, please feel free to contact the repository owner.
