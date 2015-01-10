#!/usr/bin/env node
/* vim: set ts=4 sw=4 et: */

var express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io').listen(http),
    sys = require('sys'),
    exec = require('child_process').exec;


function log(msg) {
    console.log('>> ' + msg);
}


io.sockets.on('connection', function (socket) {
    var cmds = { 'toggle': 'ls -lac', 'image': "./scripts/take_image.sh" }, 
        running = false;

    function runCmd(eventName) {
        if (!running) {
            // Fixme: check eventName exists
            running = true;
            exec(cmds[eventName], { maxBuffer: 1024*1024 }, function (error, stdout, stderr) { 
                if (error != null) {
                    socket.emit('answer-' + eventName, {error:1});
                    log("ERROR: " + error);
                } 
                else
                    socket.emit('answer-' + eventName, {error:0, payload: stdout});

                running = false;
            });
        }
        else
            socket.emit('answer-' + eventName, {error:2});
    }

    console.log('Connection...');
    socket.on('toggle', function(data) { runCmd('toggle')} );
    socket.on('image', function(data)  { runCmd('image')} );
});


log("Work dir: " + process.cwd());
app.use('/', express.static(__dirname + '/../client'));
http.listen(8000);
