const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type  -  application/json
app.use(body_parser.json());

// parse requests of content-type  -  application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: true }))

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req,res) => {
  res.json({ message: "Welcome to renato-mm application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}.`);
});
