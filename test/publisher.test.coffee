util = require 'util'
should  = require 'should'
core = require '../lib/notification-server'

describe 'Publisher', ->
  server = null
  publisher = null

  before ->
    server = new core.NotificationServer
        host: 'localhost'
        port: 2234
    server.start()
    publisher = server.publisher()

  after ->
    server.stop()

  describe '#getNow', ->

    it 'should have everyone', ->
      publisher.getNow.should.be.a('function')

    it 'should return instance of publisher.everyone', ->
      publisher.getNow().should.be.ok

    it '#everyone.now.register', ->
      publisher.getNow().register.should.be.a('function')

    it '#everyone.now.unregister', ->
      publisher.getNow().unregister.should.be.a('function')

    it '#everyone.now.publish', ->
      publisher.getNow().publish.should.be.a('function')





