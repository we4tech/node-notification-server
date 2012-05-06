events = require 'events'
util = require 'util'
EventTypes = require './event_types'

class Publisher extends events.EventEmitter

  # Construct NowJS publisher
  #
  # @param @everyone NowJS instance
  # @param @storage Storage instance
  constructor: (@everyone, @storage) ->
    @_configureMethods()

  ##-----------------
  ## Public Methods
  ##-----------------
  getNow: ->
    @everyone.now

  getDefaultGroup: ->
    @defaultGroup

  ##-----------------
  ## Private Methods
  ##-----------------
  _configureMethods: ->
    self = @
    defaultGroup = null

    @everyone.on 'disconnect', ->
      console.log "Disconnecting user - #{@now.uid}"
      self.storage.remove(@now.uid)

    @everyone.on 'connect', ->
      console.log "Connected user - #{@user.clientId}"
      self.everyone.count (v) ->
        console.log("Total users - #{v}")

    @everyone.now.register = (info) ->
      @now.uid = self.storage.add(info)
      @now.info = info

      console.log "Registering user - #{util.inspect(info)}"
      console.log "Registered id - #{@now.uid}"

      self.emit EventTypes.SUBSCRIBE_CLIENT, @now.uid, @now.info

    @everyone.now.unregister = ->
      self.storage.remove(@now.uid)
      console.log "Unregistered user - #{@now.uid}"

      delete @now.uid
      delete @now.info

      self.emit EventTypes.UNSUBSCRIBE_CLIENT, @now.uid

    @everyone.now.publish = (msg) ->
      console.log "Publishing #{util.inspect(msg)} registered id - #{@now.uid}"

      self.everyone.now.receive(@now.info, msg)
      self.emit EventTypes.PUBLISH_MSG_TO_CLIENTS, @now.uid, msg

    @everyone.now.getTotalUsers = (callback) ->
      self.everyone.count (count) ->
        callback(count, self.storage.size())


exports.Publisher = Publisher