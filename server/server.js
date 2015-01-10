#!/usr/bin/env node

/* vim :set ts=4 sw=4 et */

var express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io').listen(http);


io.sockets.on('connection', function (socket) {
    console.log("Connection...");

    socket.on('foo', function(data) {
        io.sockets.emit('bar', "stuff from server");
        console.log("Data: " + data)
    });

    socket.on('disconnect', function() {
        console.log("Bye...");
    });
});


app.use('/', express.static(__dirname + '/../client'));
http.listen(8000);
