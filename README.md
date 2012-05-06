Node Notification Server
========================

Based on NowJS, a standalone server for sending and receiving notification across different live users.

Purpose 
========

We have active online users through our flash and html5 based web application, 
Whenever data get changed our flash or html5 based clients get out of sync. 
To solve such problem we have introduced NowJS based Notification Server. 

Now whenever we alter data we can notify all active users, "Something has been changed, we need to update your current state".

Usages
======

Start Server
------------

$ notification-server -p < Port Number > ie 8080
> Server started listening on 0.0.0.0:8080

Include in your client
-----------------------
&lt;script type="text/javascript" src="http://localhost:8080/nowjs/now.js"&gt;&lt;/script&gt;

Register your client
------------------
> now.register({name: 'something', morefield: '1', anotherfield: '2'});

Access current user information
-------------------------------
> now.uid // Current user id
> now.info // Info you have passed through register(...)

Broadcast message
------------------
> now.publish('hi there');

Get total online users
-----------------------
> now.getTotalUsers(function(connectedUsersCount, registeredUsersCount) {});

Unregister user
----------------
> now.unregister();

How to Install
==============
> npm install node-notification-server

