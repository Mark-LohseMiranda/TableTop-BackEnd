const express = require("express");
const allRoutes = require("./controllers");
const sequelize = require("./config/connection.js");
// const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const https = require('https');
const fs = require('fs');
const socketServer = require("./controllers/socketServer");

const https_options = {
  ca: fs.readFileSync("ca_bundle.crt"),
 key: fs.readFileSync("private.key"),
 cert: fs.readFileSync("certificate.crt")
}

const app = express();
// const httpsServer = https.createServer(https_options, app);

https.createServer(https_options, app)
const io = new Server(https);
socketServer(io);
// const PORT = process.env.PORT || 5001;

// const models = require("./models");

//LOCAL
// app.use(cors());

//DEPLOYED
app.use(cors({
    origin:["https://tabletop.mark-lohsemiranda.com/"]
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use("/", allRoutes);

sequelize.sync({ force: false }).then(function () {
  // httpServer.listen(PORT, function () {
  //   console.log("App listening on PORT " + PORT);
  // });
  https.listen(5001)
});
