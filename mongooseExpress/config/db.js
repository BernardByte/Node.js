const mongoose = require("mongoose");
require("dotenv").config();
/*
We have different approaches to connect with database
1.Creating a connection using mongoose.createConnection() and exporting it to be used in other files.
2.Using mongoose.createConnection() with event listeners to handle connection events and exporting the connection object to be used in other files.
3.Using mongoose.connect() and exporting the connection object to be used in other files.
4.Using mongoose.connect() with Promise-based async/await syntax and exporting the connection function to be used in other files.
5.Using a singleton pattern with a Database class to manage the database connection and exporting an instance of the class to be used in other files.
Each approach has its own benefits and drawbacks,
and the choice of which approach to use will depend on the specific requirements of your application.
*/

const dbURI = process.env.MdbURL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((result) => {
            console.log("Connected to DataBase")
        })
    } catch (error) {
        console.log("Encounter an Error: ", error)
    }
}

module.exports = connectDB