// Generated by CoffeeScript 1.10.0
var Afilias, Base,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Base = require("./base").base;

Afilias = (function(superClass) {
  extend(Afilias, superClass);

  function Afilias() {
    return Afilias.__super__.constructor.apply(this, arguments);
  }

  Afilias.prototype.negative = function() {
    var domain;
    domain = this.domain.toUpperCase();
    return "No match for \"" + domain + "\".";
  };

  Afilias.prototype.positive = function() {
    var domain;
    domain = this.domain.toUpperCase();
    return "Domain Name \"" + domain + "\"";
  };

  return Afilias;

})(Base);

exports.afilias = Afilias;
