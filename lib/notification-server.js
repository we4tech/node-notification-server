(function() {
  var EventTypes, Logger, NotificationServer, events, http, nowjs, nowjsApp, storage, util;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  events = require('events');
  http = require('http');
  nowjs = require('now');
  util = require('util');
  Logger = require('./notification-server/logging').Logger;
  EventTypes = require('./notification-server/event_types').EventTypes;
  storage = require('./notification-server/storage');
  nowjsApp = require('./notification-server/publisher');
  NotificationServer = (function() {
    __extends(NotificationServer, events.EventEmitter);
    function NotificationServer(config) {
      this._isValidConfiguration(config);
      this._setup(config);
      this._configureEventsObservers;
    }
    NotificationServer.prototype.storage = function() {
      return this._storage;
    };
    NotificationServer.prototype.start = function() {
      try {
        this._createServer();
        this._createNowjs();
        this._configureNowjsMethods();
        this.emit(EventTypes.STATE_SERVER_STARTED);
        return true;
      } catch (error) {
        this.emit(EventTypes.STATE_SERVER_ERROR, error);
        return false;
      }
    };
    NotificationServer.prototype.stop = function() {
      try {
        this._stopServer();
        return this.emit(EventTypes.STATE_SERVER_STOPPED);
      } catch (error) {
        return this.emit(EventTypes.STATE_SERVER_ERROR, error);
      }
    };
    NotificationServer.prototype.publisher = function() {
      return this._nowjs_publisher;
    };
    NotificationServer.prototype._configureNowjsMethods = function() {
      this._nowjs_publisher = new nowjsApp.Publisher(this._nowjs_inst, this._storage);
      this._nowjs_publisher.on(EventTypes.SUBSCRIBE_CLIENT, __bind(function(uid, data) {
        console.log("Subscribe new client - " + uid);
        return console.log(util.inspect(data));
      }, this));
      return this._nowjs_publisher.on(EventTypes.UNSUBSCRIBE_CLIENT, __bind(function(uid) {
        return console.log("Unsubscribe new client - " + uid);
      }, this));
    };
    NotificationServer.prototype._createServer = function() {
      var _http;
      console.log('Creating server instance');
      _http = http.createServer(function(req, res) {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        return res.end('okay');
      });
      _http.listen(this._port, this._host);
      this._server_inst = _http;
      return console.log("Server started listening on http://" + this._host + ":" + this._port + "/");
    };
    NotificationServer.prototype._stopServer = function() {
      console.log('Server stopping....');
      this._server.close();
      return console.log('Server stopped.');
    };
    NotificationServer.prototype._createNowjs = function() {
      return this._nowjs_inst = nowjs.initialize(this._server_inst);
    };
    NotificationServer.prototype._isValidConfiguration = function(config) {
      if (!(config != null) || !(config.host != null) || !(config.port != null)) {
        throw new Error('Host and port is required');
      }
    };
    NotificationServer.prototype._setup = function(config) {
      this._host = config.host;
      this._port = config.port;
      if (config.storage != null) {
        return this._storage = config.storage;
      } else {
        return this._storage = new storage.Storage();
      }
    };
    NotificationServer.prototype._configureEventsObservers = function() {
      return this.on(EventTypes.SUBSCRIBE_CLIENT, __bind(function(client) {
        var _uid;
        return _uid = this.subscribeClient(client);
      }, this));
    };
    NotificationServer.prototype._subscribeClient = function(client) {
      var _uid;
      if (this._validClient(client)) {
        return _uid = this._storage.add(client);
      }
    };
    NotificationServer.prototype._validClient = function(client) {};
    return NotificationServer;
  })();
  exports.NotificationServer = NotificationServer;
}).call(this);
