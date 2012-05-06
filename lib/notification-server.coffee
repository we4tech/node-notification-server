events = require 'events'
http = require 'http'
nowjs = require 'now'
util = require 'util'

Logger = require('./notification-server/logging').Logger
EventTypes = require('./notification-server/event_types').EventTypes
storage = require './notification-server/storage'
nowjsApp = require './notification-server/publisher'

class NotificationServer extends events.EventEmitter

  # Construct notification server instance with host name and port
  #
  # @param config server configuration
  #   Server host name
  #   Server port number
  #
  # @param storage server internal storage implementation
  #
  constructor: (config) ->
    @_isValidConfiguration config
    @_setup config
    @_configureEventsObservers

  # -------------------------
  # Public methods
  # -------------------------
  storage: ->
    @_storage

  start: ->
    try
      @_createServer()
      @_createNowjs()
      @_configureNowjsMethods()
      @.emit EventTypes.STATE_SERVER_STARTED

      true
    catch error
      @.emit EventTypes.STATE_SERVER_ERROR, error

      false

  stop: ->
    try
      @_stopServer()
      @.emit EventTypes.STATE_SERVER_STOPPED

    catch error
      @.emit EventTypes.STATE_SERVER_ERROR, error

  publisher: ->
    @_nowjs_publisher

  # -------------------------
  # Private methods
  # -------------------------
  _configureNowjsMethods: ->
    @_nowjs_publisher = new nowjsApp.Publisher(@_nowjs_inst, @_storage)

    # Register new subscribe event
    @_nowjs_publisher.on EventTypes.SUBSCRIBE_CLIENT, (uid, data) =>
      console.log "Subscribe new client - #{uid}"
      console.log util.inspect(data)

    # Unregistered subscribed user event
    @_nowjs_publisher.on EventTypes.UNSUBSCRIBE_CLIENT, (uid) =>
      console.log "Unsubscribe new client - #{uid}"

  _createServer: ->
    console.log 'Creating server instance'
    _http = http.createServer((req, res) ->
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end('okay')
    )
    _http.listen @_port, @_host
    @_server_inst = _http
    console.log "Server started listening on http://#{@_host}:#{@_port}/"

  _stopServer: ->
    console.log 'Server stopping....'
    @_server.close()
    console.log 'Server stopped.'

  _createNowjs: ->
    @_nowjs_inst = nowjs.initialize @_server_inst

  _isValidConfiguration: (config) ->
    if not config? or not config.host? or not config.port?
      throw new Error('Host and port is required')

  _setup: (config) ->
    # Set host and port configuration
    @_host = config.host
    @_port = config.port

    # Set default storage or user defined one
    if config.storage?
      @_storage = config.storage
    else
      @_storage = new storage.Storage()

  _configureEventsObservers: ->
    @.on EventTypes.SUBSCRIBE_CLIENT, (client) =>
      _uid = @subscribeClient(client)

  _subscribeClient: (client) ->
    if @_validClient(client)
      _uid = @_storage.add client

  _validClient: (client) ->

# Set for export
exports.NotificationServer = NotificationServer


