class Storage

  constructor: ->
    @_data = {}
    @_keys = []

  _generateUID: ->
    (new Date().getTime() * 6000 * Math.random()).toString().replace('.', '')

  add: (object) ->
    uid = @_generateUID()
    @_data[uid] = object

    @_keys.push uid
    uid

  size: ->
    @_keys.length

  remove: (uid) ->
    if @exist(uid)
      delete @_data[uid]
      @_keys.splice(@_keys.indexOf(uid), 1)


  exist: (uid) ->
    uid in @_keys

  reset: ->
    @_data = []
    @_keys = []

exports.Storage = Storage