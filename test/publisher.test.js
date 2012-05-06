(function() {
  var core, should, util;
  util = require('util');
  should = require('should');
  core = require('../lib/notification-server');
  describe('Publisher', function() {
    var publisher, server;
    server = null;
    publisher = null;
    before(function() {
      server = new core.NotificationServer({
        host: 'localhost',
        port: 2234
      });
      server.start();
      return publisher = server.publisher();
    });
    after(function() {
      return server.stop();
    });
    return describe('#getNow', function() {
      it('should have everyone', function() {
        return publisher.getNow.should.be.a('function');
      });
      it('should return instance of publisher.everyone', function() {
        return publisher.getNow().should.be.ok;
      });
      it('#everyone.now.register', function() {
        return publisher.getNow().register.should.be.a('function');
      });
      it('#everyone.now.unregister', function() {
        return publisher.getNow().unregister.should.be.a('function');
      });
      return it('#everyone.now.publish', function() {
        return publisher.getNow().publish.should.be.a('function');
      });
    });
  });
}).call(this);
