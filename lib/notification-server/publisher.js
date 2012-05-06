(function() {
  var EventTypes, Publisher, events, util;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  events = require('events');
  util = require('util');
  EventTypes = require('./event_types');
  Publisher = (function() {
    __extends(Publisher, events.EventEmitter);
    function Publisher(everyone, storage) {
      this.everyone = everyone;
      this.storage = storage;
      this._configureMethods();
    }
    Publisher.prototype.getNow = function() {
      return this.everyone.now;
    };
    Publisher.prototype.getDefaultGroup = function() {
      return this.defaultGroup;
    };
    Publisher.prototype._configureMethods = function() {
      var defaultGroup, self;
      self = this;
      defaultGroup = null;
      this.everyone.on('disconnect', function() {
        console.log("Disconnecting user - " + this.now.uid);
        return self.storage.remove(this.now.uid);
      });
      this.everyone.on('connect', function() {
        console.log("Connected user - " + this.user.clientId);
        return self.everyone.count(function(v) {
          return console.log("Total users - " + v);
        });
      });
      this.everyone.now.register = function(info) {
        this.now.uid = self.storage.add(info);
        this.now.info = info;
        console.log("Registering user - " + (util.inspect(info)));
        console.log("Registered id - " + this.now.uid);
        return self.emit(EventTypes.SUBSCRIBE_CLIENT, this.now.uid, this.now.info);
      };
      this.everyone.now.unregister = function() {
        self.storage.remove(this.now.uid);
        console.log("Unregistered user - " + this.now.uid);
        delete this.now.uid;
        delete this.now.info;
        return self.emit(EventTypes.UNSUBSCRIBE_CLIENT, this.now.uid);
      };
      this.everyone.now.publish = function(msg) {
        console.log("Publishing " + (util.inspect(msg)) + " registered id - " + this.now.uid);
        self.everyone.now.receive(this.now.info, msg);
        return self.emit(EventTypes.PUBLISH_MSG_TO_CLIENTS, this.now.uid, msg);
      };
      return this.everyone.now.getTotalUsers = function(callback) {
        return self.everyone.count(function(count) {
          return callback(count, self.storage.size());
        });
      };
    };
    return Publisher;
  })();
  exports.Publisher = Publisher;
}).call(this);
