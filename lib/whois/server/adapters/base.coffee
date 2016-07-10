net = require('net');
punycode = require('punycode');
queue = new Array
maxQueue = 200
spawned = 0

class Base
    Answer = require('../../answer').answer;

    constructor: ->
        this.port = 43;
        this.timeout = 5000;

    lookup: (domain, callback) ->
        this.domain = domain;
        result = new Answer(this.negative(), this.positive(), this.failure());
        result.domain = domain;
        if (spawned < maxQueue)
            _lookup [result, this.request(), this.port, this.host, this.timeout, (response) ->
                callback(response)]
        else
            queue.push [result, this.request(), this.port, this.host, this.timeout, (response) ->
                callback(response)]

    _lookup = (inArray) ->
        result = inArray[0]
        request = inArray[1]
        port = inArray[2]
        host = inArray[3]
        # console.log 'request informations:', inArray
        timeout = inArray[4]
        cb = inArray[5]
        spawned++
        domain = result.domain
        r = result
        r.raw = new Array();

        # Connect to remote server and fetch data
        # ---------------------------------------------------------
        socket = net.connect(port, host, () ->
            # console.log 'connected... to', host, encodeURI(request)
            # console.log encodeURI(request);
            return socket.write(request);
        );

        socket.setTimeout(timeout) if (timeout?)

        data = '';
        socket.on('data', (chunk) ->
            r.raw.push(chunk);
            # return data += chunk;
        );
        socket.on('timeout', () ->
            # return console.log (new Error('lookup: timeout'));
                socket.destroy()
                r.raw = "timeout"
                cb(r);
                spawned--
                if (queue.length)
                    _lookup(queue.shift());
        );
        socket.on('error', (err) ->
            #   return console.log (err);
                console.log("Bad things just happened!" + err);
                socket.destroy();
                r.raw = "error"
                cb(r);
                spawned--
                if (queue.length)
                    _lookup(queue.shift());
        );
        socket.on('end', (err) ->
                # return console.log (data);
                # console.log r.raw
                socket.end()
                r.raw = r.raw.toString()
                cb(r)
                spawned--
                if (queue.length)
                    _lookup(queue.shift());
        );
        return socket.on('close', (err) ->
            # console.log 'closed', data
        )

    request: ->
        # "=" +
        return this.domain + '\r\n';

    negative: ->
        domain = this.domain.toUpperCase();
        return "No match for \"" + domain + "\""

    positive: ->
        domain = this.domain.toUpperCase();
        return "Domain Name: " + domain

    failure: ->
        return "ERROR|WHOIS LIMIT EXCEEDED"

exports.base = Base
