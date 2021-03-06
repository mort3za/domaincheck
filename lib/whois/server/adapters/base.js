// Generated by CoffeeScript 1.10.0
var Base, maxQueue, net, punycode, queue, spawned;

net = require('net');

punycode = require('punycode');

queue = new Array;

maxQueue = 200;

spawned = 0;

Base = (function() {
  var Answer, _lookup;

  Answer = require('../../answer').answer;

  function Base() {
    this.port = 43;
    this.timeout = 5000;
  }

  Base.prototype.lookup = function(domain, callback) {
    var result;
    this.domain = domain;
    result = new Answer(this.negative(), this.positive(), this.failure());
    result.domain = domain;
    if (spawned < maxQueue) {
      return _lookup([
        result, this.request(), this.port, this.host, this.timeout, function(response) {
          return callback(response);
        }
      ]);
    } else {
      return queue.push([
        result, this.request(), this.port, this.host, this.timeout, function(response) {
          return callback(response);
        }
      ]);
    }
  };

  _lookup = function(inArray) {
    var cb, data, domain, host, port, r, request, result, socket, timeout;
    result = inArray[0];
    request = inArray[1];
    port = inArray[2];
    host = inArray[3];
    timeout = inArray[4];
    cb = inArray[5];
    spawned++;
    domain = result.domain;
    r = result;
    r.raw = new Array();
    socket = net.connect(port, host, function() {
      return socket.write(request);
    });
    if ((timeout != null)) {
      socket.setTimeout(timeout);
    }
    data = '';
    socket.on('data', function(chunk) {
      return r.raw.push(chunk);
    });
    socket.on('timeout', function() {
      socket.destroy();
      r.raw = "timeout";
      cb(r);
      spawned--;
      if (queue.length) {
        return _lookup(queue.shift());
      }
    });
    socket.on('error', function(err) {
      console.log("Bad things just happened!" + err);
      socket.destroy();
      r.raw = "error";
      cb(r);
      spawned--;
      if (queue.length) {
        return _lookup(queue.shift());
      }
    });
    socket.on('end', function(err) {
      socket.end();
      r.raw = r.raw.toString();
      cb(r);
      spawned--;
      if (queue.length) {
        return _lookup(queue.shift());
      }
    });
    return socket.on('close', function(err) {});
  };

  Base.prototype.request = function() {
    return this.domain + '\r\n';
  };

  Base.prototype.negative = function() {
    var domain;
    domain = this.domain.toUpperCase();
    return "No match for \"" + domain + "\"";
  };

  Base.prototype.positive = function() {
    var domain;
    domain = this.domain.toUpperCase();
    return "Domain Name: " + domain;
  };

  Base.prototype.failure = function() {
    return "ERROR|WHOIS LIMIT EXCEEDED";
  };

  return Base;

})();

exports.base = Base;
