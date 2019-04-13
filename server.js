var express = require('express')
var serveStatic = require('serve-static')
var path = require('path')

var app = express()
app.use(serveStatic(path.join(__dirname, '/dist')))

var port = process.env.PORT || 8000
app.listen(port)
console.log('server started ' + port)
