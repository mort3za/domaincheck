// Generated by CoffeeScript 1.10.0
var Base, Pir,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Base = require("./base").base;

Pir = (function(superClass) {
  extend(Pir, superClass);

  function Pir() {
    return Pir.__super__.constructor.apply(this, arguments);
  }

  Pir.prototype.negative = function() {
    var domain;
    domain = this.domain.toUpperCase();
    return "NOT FOUND|No match for \"" + domain + "\"";
  };

  Pir.prototype.positive = function() {
    return "Registrant Name:";
  };

  Pir.prototype.request = function() {
    return "FULL " + this.domain + '\r\n';
  };

  Pir.prototype.failure = function() {
    return "WHOIS LIMIT EXCEEDED";
  };

  return Pir;

})(Base);

exports.pir = Pir;
