(function() {
  var Storage;
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  Storage = (function() {
    function Storage() {
      this._data = {};
      this._keys = [];
    }
    Storage.prototype._generateUID = function() {
      return (new Date().getTime() * 6000 * Math.random()).toString().replace('.', '');
    };
    Storage.prototype.add = function(object) {
      var uid;
      uid = this._generateUID();
      this._data[uid] = object;
      this._keys.push(uid);
      return uid;
    };
    Storage.prototype.size = function() {
      return this._keys.length;
    };
    Storage.prototype.remove = function(uid) {
      if (this.exist(uid)) {
        delete this._data[uid];
        return this._keys.splice(this._keys.indexOf(uid), 1);
      }
    };
    Storage.prototype.exist = function(uid) {
      return __indexOf.call(this._keys, uid) >= 0;
    };
    Storage.prototype.reset = function() {
      this._data = [];
      return this._keys = [];
    };
    return Storage;
  })();
  exports.Storage = Storage;
}).call(this);
