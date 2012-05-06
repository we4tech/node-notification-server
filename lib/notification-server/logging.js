(function() {
  var Logger;
  Logger = (function() {
    function Logger(category, level) {
      this.category = category;
      this.level = level != null ? level : 0;
    }
    return Logger;
  })();
  Logger.LEVELS = ['error', 'warn', 'info', 'debug'];
  exports.Logger = Logger;
}).call(this);
