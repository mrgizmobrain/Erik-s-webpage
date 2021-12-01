/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Erik Hoffman
 * Email: hoffmeri@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars')

var postData = require('./postData.json')

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/', function (req,res,next) {
	res.status(200).render('postsPage', {postData: postData})
});

app.get('/posts/:n', function (req,res,next) {
	var n = req.params.n
	res.status(200).render('singlePost', {data: postData[n]})
});

app.get('*', function (req, res) {
  res.status(404).render('404')
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});