var http = require("http");
var express = require("express");
var consolidate = require("consolidate"); //1
var _ = require("underscore");
var bodyParser = require("body-parser");
const path = require('path')

var mongoClient = require("mongodb").MongoClient;

var app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
  bodyParser.json({
    limit: "5mb"
  })
);

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.set("view engine", "html");
app.engine("html", consolidate.underscore); //Use underscore to parse templates when we do res.render

var server = http.Server(app);
const PORT = process.env.PORT || 5000;

var io = require("socket.io")(server); //Creating a new socket.io instance by passing the HTTP server object

server.listen(PORT, function() {
   //Runs the server on port 8000
  console.log('Server listening at port ${PORT}' );
  var dburl =
    "mongodb://appchto:" +
    encodeURIComponent("Password!1") +
    "@ds237574.mlab.com:37574/node?retryWrites=true";

  mongoClient.connect(dburl, function(err, db) {
    //a connection with the mongodb is established here.
    console.log("Connected to Database");

    app.get("/", function(req, res) {
      res.render("index.html");
    });
    app.get("/index2", function(req, res) {
      res.render("index2.html");
    });
    app.get("/index3", function(req, res) {
      res.render("index3.html");
    });
    
    io.on("connection", function(socket) {
      //Listen on the 'connection' event for incoming sockets
      console.log("A user just connected");

      socket.on("join", function(data) {
        //Listen to any join event from connected users
        socket.join(data.userId); //User joins a unique room/channel that's named after the userId
        console.log("User joined room: " + data.userId);
      });

      routes.initialize(app, db, socket, io); //Pass socket and io objects that we could use at different parts of our app
    });
  });
});
