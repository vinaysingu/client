
/**
*/
_.extend(String.prototype, {
  camelize: function() {
    var args = XT.$A(arguments);
    return XT.String.camelize(this, args);
  },
  format: function() {
    var args = XT.$A(arguments);
    return XT.String.format(this, args);
  },
  f: function() {
    var args = XT.$A(arguments);
    return XT.String.format(this, args);
  },
  loc: function() {
    var args = XT.$A(arguments);
    args.unshift(this);    
    return XT.String.loc.apply(XT.String, args);
  },
  trim: function() {
    return XT.String.trim(this);
  }  
});