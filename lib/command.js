(function() {
  var Processor, core, optparse, switches, util;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  util = require('util');
  optparse = require('optparse');
  core = require('../lib/notification-server');
  switches = exports.switches = [['-h', '--help', 'Print this'], ['-p', '--port NUMBER', 'Notification Server Port'], ['-H', '--host TEXT', 'Notification Server Host'], ['-f', '--forever', 'Show forever executable code']];
  Processor = (function() {
    function Processor(argv) {
      this.argv = argv;
      this.config = {
        host: '0.0.0.0',
        daemon: false
      };
      this.parser = new optparse.OptionParser(switches);
      this.parser.banner = 'Usage: notification-server -p <Port>';
      this._configureParser();
    }
    Processor.prototype._configureParser = function() {
      this.parser.on('port', __bind(function(k, value) {
        return this.config.port = value;
      }, this));
      this.parser.on('host', __bind(function(k, value) {
        return this.config.host = value;
      }, this));
      this.parser.on('daemon', __bind(function() {
        return this.config.daemon = true;
      }, this));
      this.parser.on('help', __bind(function() {
        return util.puts(this.parser);
      }, this));
      return this.parser.on('forever', __bind(function() {
        return util.puts("forever start notification-server -H localhost -p 2212");
      }, this));
    };
    Processor.prototype.run = function() {
      this.parser.parse(this.argv);
      console.log(util.inspect(this.config));
      if (typeof this.config.port === 'undefined') {
        return util.puts(this.parser);
      } else {
        this.server = new core.NotificationServer(this.config);
        return this.server.start();
      }
    };
    Processor.prototype.getServer = function() {
      return this.server;
    };
    return Processor;
  })();
  exports.Processor = Processor;
}).call(this);
