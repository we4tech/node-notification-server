util = require 'util'
should  = require 'should'
core = require '../lib/notification-server'

describe 'NotificationServer', ->

  describe '#constructor', ->
    it 'should construct server with valid host and port', ->
      new core.NotificationServer({host: 'localhost', port: 2212}).should.be.ok

    it 'should throw error if no valid host and port', ->
      (-> new core.NotificationServer()).should.throw()


  describe '#instance', ->
    server = null

    before ->
      server = new core.NotificationServer({host: 'localhost', port: 2212})

    it 'should set default storage implementation', ->
      server.storage.should.be.ok

    describe 'Storage', ->
      describe '#add', ->
        storage = null
        before ->
          storage = new core.NotificationServer({host: 'localhost', port: 2212}).storage()

        it 'should add new item', ->
          storage.add({name: 'hasan'}).should.be.ok

        it 'should have 2 items', ->
          storage.reset()
          storage.add({name: 'hasan'})
          storage.add({name: 'hasan2'})
          storage.size().should.eql 2

      describe '#reset', ->
        storage = null
        before ->
          storage = new core.NotificationServer({host: 'localhost', port: 2212}).storage()

        it 'should reset items from storage', ->
          storage.add({name: 'test1'})
          storage.size().should.eql 1

          storage.reset()
          storage.size().should.eql 0

          storage.add({name: 'test1'})
          storage.size().should.eql 1

      describe '#remove', ->
        storage = null
        before ->
          storage = new core.NotificationServer({host: 'localhost', port: 2212}).storage()

        it 'should remove item from storage', ->
          storage.reset()
          id = storage.add({name: 'hola'})
          id = storage.add({name: 'hola2'})
          storage.size().should.eql 2

          storage.remove(id).should.be.ok
          storage.size().should.eql 1

    describe '#start', ->
      server = null
      before ->
        server = new core.NotificationServer({host: 'localhost', port: 2212})

      it 'should start server', ->
        server.start().should.be.ok





