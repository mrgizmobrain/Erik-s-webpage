/*
 * Write your server code in this file.
 *
 * name: Erik Hoffman
 * email: hoffmeri@oregonstate.edu
 */

var http = require('http')
var fs = require('fs')

var PORT = process.env.PORT || 3000

function Dope (res, code, type, content) {
    res.statusCode = code
    res.setHeader('Content-Type', type)
    res.write(content)
    res.end()
}


var benny, indexJS, indexHTML, style, fourOhFour 

var server = http.createServer(function (req, res) {
    if(req.url==='/index.html' || req.url==='/') {
        if(indexHTML) {
            Dope(res, 200, 'text/html', indexHTML)
        }
        else {
            fs.readFile('public/index.html', 'utf8', function (err, contents) {
                if (!err) {
                    indexHTML = contents
                    Dope(res, 200, 'text/html', contents)
                }
            })
        }
    }
    else if(req.url==='/benny.jpg') {
        if(benny) {
            Dope(res, 200, 'image/jpeg', benny)
        }
        else {
            fs.readFile('public/benny.jpg', 'utf8', function (err, contents) {
                if (!err) {
                    benny = contents
                    Dope(res, 200, 'image/jpeg', contents)
                }
            })
        }
    }
    else if(req.url==='/index.js') {
        if(indexJS) {
            Dope(res, 200, 'application/javascript', indexJS)
        }
        else {
            fs.readFile('public/index.js', 'utf8', function (err, contents) {
                if (!err) {
                    indexJS = contents
                    Dope(res, 200, 'application/javascript', contents)
                }
            })
        }
    }
    else if(req.url==='/style.css') {
        if(style) {
            Dope(res, 200, 'text/css', style)
        }
        else {
            fs.readFile('public/style.css', 'utf8', function (err, contents) {
                if (!err) {
                    style = contents
                    Dope(res, 200, 'text/css', contents)
                }
            })
        }
    }
    else {
        if(fourOhFour) {
            Dope(res, 404, 'text/html', fourOhFour)
        }
        else {
            fs.readFile('public/404.html', 'utf8', function (err, contents) {
                if (!err) {
                    fourOhFour = contents
                    Dope(res, 404, 'text/html', contents)
                }
            })
        }
    }
})

server.listen(PORT, function () {
    console.log("== Server is listening on port:", PORT)
})