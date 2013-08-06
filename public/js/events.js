var Events = {
  bind : function(ev, callback, context) {
    var calls = this._callbacks || (this._callbacks = {});
    var list  = calls[ev] || (calls[ev] = []);
    list.push([callback, context]);
    return this;
  },
  unbind : function(ev, callback) {
    var calls;
    if (!ev) {
      this._callbacks = {};
    } else if (calls = this._callbacks) {
      if (!callback) {
        calls[ev] = [];
      } else {
        var list = calls[ev];
        if (!list) return this;
        for (var i = 0, l = list.length; i < l; i++) {
          if (list[i] && callback === list[i][0]) {
            list[i] = null;
            break;
          }
        }
      }
    }
    return this;
  },
  trigger : function(eventName) {
    var list, calls, ev, callback, args;
    var both = 2;
    if (!(calls = this._callbacks)) return this;
    while (both--) {
      ev = both ? eventName : 'all';
      if (list = calls[ev]) {
        for (var i = 0, l = list.length; i < l; i++) {
          if (!(callback = list[i])) {
            list.splice(i, 1); i--; l--;
          } else {
            args = both ? Array.prototype.slice.call(arguments, 1) : arguments;
            callback[0].apply(callback[1] || this, args);
          }
        }
      }
    }
    return this;
  }
};
