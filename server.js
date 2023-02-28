const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
    .then(() => {
        console.log("Synced database.");
    })
    .catch((err) => {
        console.log("Failed to sync database: " + err.message);
    });

// // drop the table if it already exists
// db.sequelize.sync({ force: false }).then(() => {
//    console.log("Drop and re-sync database... or actually let's not.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to INKS API" });
});

require("./app/routes/tutorial.routes")(app);
require("./app/routes/curse.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}.');
});