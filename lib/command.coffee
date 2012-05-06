util = require 'util'
optparse = require 'optparse'
core = require '../lib/notification-server'

switches = exports.switches = [
  ['-h', '--help', 'Print this'],
  ['-p', '--port NUMBER', 'Notification Server Port'],
  ['-H', '--host TEXT', 'Notification Server Host'],
  ['-f', '--forever', 'Show forever executable code']
]

class Processor
  constructor: (@argv) ->
    @config = {
      host: '0.0.0.0',
      daemon: false
    }
    @parser = new optparse.OptionParser(switches)
    @parser.banner = 'Usage: notification-server -p <Port>';
    @_configureParser()

  _configureParser: ->
    @parser.on 'port', (k, value) =>
      @config.port = value

    @parser.on 'host', (k, value) =>
      @config.host = value

    @parser.on 'daemon', =>
      @config.daemon = true

    @parser.on 'help', =>
      util.puts @parser

    @parser.on 'forever', =>
      util.puts "forever start notification-server -H localhost -p 2212"


  run: ->
    @parser.parse(@argv)

    if @config.port == null
      util.puts @parser
    else
      @server = new core.NotificationServer(@config)
      @server.start();

  getServer: ->
    @server

exports.Processor = Processor