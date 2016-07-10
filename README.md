# WhoisJS

A WHOIS module for Node.js written in CoffeeScript. WhoisJS is able to perform lookups on over 200 TLDs.

This is a fork of https://github.com/juliangiuca/whoisjs with some fixes.
Maybe some of TLDs need review, I just checked .com .org .ir .net, But other TLDs should work as well, If you see any issues send them here: https://github.com/mort3za/domaincheck/issues

## Requirements
This library has been tested with Node.JS 6.2.2

## How to Install
  $ npm install whoisjs

## How to Use
```
  DomainCheck = require('domaincheck').whois

  who = new DomainCheck()
  domain = "wikipedia.org"

  who.query domain, (response) ->
    state = "available" if response.available()
    state = "unavailable" if response.unavailable()
    state = "timeout" if response.timeout()
    state = "error" if response.error()
    state ||= "unknown"
    callback(domain, state);
```

## How to debug
#### Show me the whois response already!
From the above, `response.raw` contains the response data from the Whois server. console.log it, and see what's happening.  

The `lib/whois/server/adapters` files describe how the response is interpreted via the `positive()`, `negative()`, and `error()` functions.
If you notice the responses aren't being registered correctly, please file and issue or send a pull request.

## License
WhoisJS is released under the MIT license.

## Credit
WhoisJS is inspired by [Ruby Whois](https://github.com/weppos/whois)

## Author
[Julian Giuca](mailto:whoisjs@eggandjam.com).

## Maintainer
[Morteza Ziaeemehr](mailto:ziaeemehr@nikmodern.com).

Please feel free to contact me with any questions, tips, or suggestions.
