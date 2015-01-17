#!/usr/bin/env node
/* vim: set ts=4 sw=4 et: */

var port = 8080,
    a_user = 'drio', 
    a_password= '4de8b8116a704f4c7c654d932b852d60',
    express = require('express'),
    app = express(),
    basicAuth = require('basic-auth');
    http = require('http').createServer(app),
    io = require('socket.io').listen(http),
    sys = require('sys'),
    crypto = require('crypto'),
    exec = require('child_process').exec;


function log(msg) {
    console.log('>> ' + msg);
}


io.sockets.on('connection', function (socket) {
    var script = "./scripts/doit.sh ",
        cmds = { 'toggle': script + " toggle" , 'image': script + " image" }, 
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


var auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401)
    };

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    };

    var md5_pass = crypto.createHash('md5').update(user.pass).digest('hex');
    if (user.name === a_user && md5_pass === a_password) {
        return next();
    } else {
        return unauthorized(res);
    };
};


log("Work dir: " + process.cwd() + "| Port: " + port);
app.use('/', auth, express.static(__dirname + '/../client'));
http.listen(port);
