class Logger
  constructor: (@category, @level = 0) ->


Logger.LEVELS = [
    'error'
  , 'warn'
  , 'info'
  , 'debug'
]

exports.Logger = Logger