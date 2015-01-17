### Very simple way to control and monitor your garage with Raspberry PI

![](http://f.cl.ly/items/2A1Z0y1L2T1w43450a24/Screen%20Shot%202015-01-11%20at%2012.24.45.png)


Intro
---

This is a simple webapp to control your garage door using: 

    - improve readme (other dendencies)
    - raspberry [pi](http://www.raspberrypi.org/)
    - linux
    - nodejs (express, socketio)


Todo
---
    - improve frontend
    - authentication
    - https



Requirements
---

This compiles node from source and since the computer power of the
pi is very minimal, this will take some time. Look online for alternatives
that use precompiled packages.

    $ wget http://nodejs.org/dist/v0.10.35/node-v0.10.35.tar.gz
    $ tar zxvf node-v0.10.35.tar.gz
    $ cd node-v0.10.35
    $ ./configure && make && sudo make install 
    $ sudo apt-get install sharutils // Will install uuencode

In your pi (assuming you are running raspbian), then clone the project and
within the project directory install the node packages with npm:

    $ git clone git://github.com/drio/garage-door
    $ cd garage-door
    $ npm install express socket.io
    $ ./server/server.js

