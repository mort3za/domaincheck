class Client
    require("./definitions/tlds")

    lookup: (domain, callback, server) ->
        console.log 'Matched server:', server
        console.log 'domain', domain
        if not server
            callback({validation: false, message: 'Top Level Domain not supported.'})
        else
            server = server[1]
            # console.log 'server:', server, server.lookup
            server.lookup domain, (response) ->
                # console.log response
                callback(response)

exports.client = Client
