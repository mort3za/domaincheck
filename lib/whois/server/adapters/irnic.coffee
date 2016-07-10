Base = require("./base").base;

class Irnic extends Base

  negative: ->
    domain = this.domain;
    return "ERROR:101: no entries found"

  positive: ->
    domain = this.domain;
    return "domain:\\s*" + domain

  failure: ->
      return "------------TODO--------------"

exports.irnic = Irnic
