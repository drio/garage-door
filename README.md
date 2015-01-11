## Simple controling and monitoring your garaje with Raspberry


Intro
---

Todo
---
    - finish frontend
    - improve readme
    - authentication
    - https

Requirements
---

This compiles node from source and since the computer power of the
pi is very minimal, this will take some time. Look online for alternatives
that use precompiled packages.

```
wget http://nodejs.org/dist/v0.10.35/node-v0.10.35.tar.gz
tar zxvf node-v0.10.35.tar.gz
cd node-v0.10.35
./configure && make && sudo make install 
```

In your pi (assuming you are running raspbian), then clone the project and
within the project directory install the node packages with npm:

```
git clone git://github.com/drio/garage-door
...
cd garage-door
npm install express socket.io

# And this will install uuencode (among other things):
sudo apt-get install sharutils
```

