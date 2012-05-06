(function() {
  var core, should, util;
  util = require('util');
  should = require('should');
  core = require('../lib/notification-server');
  describe('NotificationServer', function() {
    describe('#constructor', function() {
      it('should construct server with valid host and port', function() {
        return new core.NotificationServer({
          host: 'localhost',
          port: 2212
        }).should.be.ok;
      });
      return it('should throw error if no valid host and port', function() {
        return (function() {
          return new core.NotificationServer();
        }).should["throw"]();
      });
    });
    return describe('#instance', function() {
      var server;
      server = null;
      before(function() {
        return server = new core.NotificationServer({
          host: 'localhost',
          port: 2212
        });
      });
      it('should set default storage implementation', function() {
        return server.storage.should.be.ok;
      });
      describe('Storage', function() {
        describe('#add', function() {
          var storage;
          storage = null;
          before(function() {
            return storage = new core.NotificationServer({
              host: 'localhost',
              port: 2212
            }).storage();
          });
          it('should add new item', function() {
            return storage.add({
              name: 'hasan'
            }).should.be.ok;
          });
          return it('should have 2 items', function() {
            storage.reset();
            storage.add({
              name: 'hasan'
            });
            storage.add({
              name: 'hasan2'
            });
            return storage.size().should.eql(2);
          });
        });
        describe('#reset', function() {
          var storage;
          storage = null;
          before(function() {
            return storage = new core.NotificationServer({
              host: 'localhost',
              port: 2212
            }).storage();
          });
          return it('should reset items from storage', function() {
            storage.add({
              name: 'test1'
            });
            storage.size().should.eql(1);
            storage.reset();
            storage.size().should.eql(0);
            storage.add({
              name: 'test1'
            });
            return storage.size().should.eql(1);
          });
        });
        return describe('#remove', function() {
          var storage;
          storage = null;
          before(function() {
            return storage = new core.NotificationServer({
              host: 'localhost',
              port: 2212
            }).storage();
          });
          return it('should remove item from storage', function() {
            var id;
            storage.reset();
            id = storage.add({
              name: 'hola'
            });
            id = storage.add({
              name: 'hola2'
            });
            storage.size().should.eql(2);
            storage.remove(id).should.be.ok;
            return storage.size().should.eql(1);
          });
        });
      });
      return describe('#start', function() {
        server = null;
        before(function() {
          return server = new core.NotificationServer({
            host: 'localhost',
            port: 2212
          });
        });
        return it('should start server', function() {
          return server.start().should.be.ok;
        });
      });
    });
  });
}).call(this);
