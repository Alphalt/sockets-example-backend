var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    http = require('http').Server(app);
    io = require('socket.io')(http)
    Todos = require('./src/models/todosModel'), //created model loading here
    bodyParser = require('body-parser'),
    config = require('./src/config/connectionDB'),
    todosController = require('./src/controllers/todosController')(io);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnectionString());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

http.listen(port);

console.log('todo list RESTful API server started on: ' + port);
