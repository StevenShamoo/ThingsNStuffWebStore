var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));


app.listen(8080);